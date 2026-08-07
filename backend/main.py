from __future__ import annotations

import json
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

RAIZ = Path(__file__).resolve().parent.parent
load_dotenv(RAIZ / ".env")

API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
MODELO = os.getenv("GEMINI_MODELO", "gemini-3.6-flash").strip()
ENDPOINT = (
    f"https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent"
)

COLS, ROWS = 12, 8

DIRECCIONES = ("right", "left", "up", "down")
MAX_MOVES = 200
TIMEOUT = 45

INSTRUCCION_SISTEMA = (
    "Eres el motor de movimiento de un juego de rejilla. El jugador empieza en "
    f"columna 0, fila 0 de una cuadrícula de {COLS}x{ROWS} (origen arriba-izquierda; "
    "right=+x, left=-x, down=+y, up=-y). Convierte la instrucción del usuario en "
    "movimientos UNITARIOS. Síguela LITERALMENTE: no resuelvas el laberinto ni "
    "corrijas al usuario, aunque choque. Expande '3 a la derecha' a tres 'right'. "
    'Responde SOLO JSON con la forma {"moves":["right","down",...]}. '
    "Direcciones válidas: right,left,up,down."
)

app = FastAPI(title="laberinto-prompt")


@app.middleware("http")
async def sin_cache(peticion, siguiente):
    respuesta = await siguiente(peticion)
    respuesta.headers["Cache-Control"] = "no-store, must-revalidate"
    return respuesta


class Peticion(BaseModel):
    instruccion: str = Field(..., min_length=1, max_length=1000)


def extraer_moves(texto: str) -> list[str]:
    limpio = texto.strip().strip("`").removeprefix("json").strip()

    if not limpio.startswith("{"):
        desde, hasta = limpio.find("{"), limpio.rfind("}")
        if desde != -1 and hasta > desde:
            limpio = limpio[desde : hasta + 1]

    try:
        moves = json.loads(limpio)["moves"]
    except Exception:
        raise HTTPException(422, f"el agente no devolvió JSON válido: {texto[:140]}")

    if not isinstance(moves, list) or not moves:
        raise HTTPException(422, "el agente no encontró ningún movimiento en tu instrucción.")
    if len(moves) > MAX_MOVES:
        raise HTTPException(422, f"son {len(moves)} movimientos; el máximo es {MAX_MOVES}.")

    limpios = []
    for i, bruto in enumerate(moves, start=1):
        direccion = str(bruto).strip().lower()
        if direccion not in DIRECCIONES:
            raise HTTPException(422, f'movimiento no válido en la posición {i}: "{bruto}"')
        limpios.append(direccion)
    return limpios


@app.post("/api/mover")
async def mover(peticion: Peticion) -> dict:
    if not API_KEY:
        raise HTTPException(
            400, "falta GEMINI_API_KEY: ponla en el fichero .env y reinicia el servidor."
        )

    cuerpo = {
        "systemInstruction": {"parts": [{"text": INSTRUCCION_SISTEMA}]},
        "contents": [{"parts": [{"text": peticion.instruccion}]}],
        "generationConfig": {"responseMimeType": "application/json"},
    }

    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as cliente:
            respuesta = await cliente.post(
                ENDPOINT,
                json=cuerpo,
                headers={"x-goog-api-key": API_KEY},
            )
    except httpx.TimeoutException:
        raise HTTPException(504, f"el agente no respondió en {TIMEOUT} s. Reintenta.")
    except httpx.HTTPError:
        raise HTTPException(502, "no se pudo contactar con la API de Gemini (¿sin conexión?).")

    datos = respuesta.json() if respuesta.headers.get("content-type", "").startswith("application/json") else {}

    if respuesta.status_code >= 400:
        detalle = datos.get("error", {}).get("message", respuesta.text[:200])
        raise HTTPException(502, f"la API devolvió {respuesta.status_code}: {detalle}")

    candidatos = datos.get("candidates") or []
    if not candidatos:
        raise HTTPException(502, "el agente no devolvió ninguna respuesta.")

    partes = candidatos[0].get("content", {}).get("parts", [])
    texto = "".join(p["text"] for p in partes if p.get("text") and not p.get("thought"))

    uso = datos.get("usageMetadata") or {}
    entrada = int(uso.get("promptTokenCount", 0))
    salida = int(uso.get("candidatesTokenCount", 0)) + int(uso.get("thoughtsTokenCount", 0))

    return {
        "moves": extraer_moves(texto),
        "tokens": {
            "entrada": entrada,
            "salida": salida,
            "total": int(uso.get("totalTokenCount", entrada + salida)),
        },
    }


app.mount("/", StaticFiles(directory=RAIZ / "frontend", html=True), name="web")
