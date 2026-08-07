<h1 align="center">juegos_aperture</h1>

<p align="center">
  Web de presentación del semillero de <b>Data Science e IA</b>,<br>
  para stands y eventos presenciales.
</p>

## Pestañas

| | |
| --- | --- |
| **01 · el semillero** | Las tres líneas del semillero, cada una con su ficha y sus temas. |
| **02 · gato & ratón** | Escribes la ruta hasta el ratón y un agente la obedece al pie de la letra: si chocas, chocas. |
| **03 · preguntados** | Cuestionario a contrarreloj: un gachapón sortea cinco preguntas de los temas que dejes encendidos. |

## .env

En la raíz del proyecto. Está en `.gitignore`.

```ini
GEMINI_API_KEY=tu-clave-aqui
GEMINI_MODELO=gemini-3.6-flash
```

|                  |             |                                                              |
| ---------------- | ----------- | ------------------------------------------------------------ |
| `GEMINI_API_KEY` | obligatoria | se saca en [Google AI Studio](https://aistudio.google.com/apikey) |
| `GEMINI_MODELO`  | opcional    | por defecto `gemini-3.6-flash`                                |


## Arrancar

```bash
uv venv
uv pip install -r backend/requirements.txt
uv run uvicorn backend.main:app --reload
```

<p align="center">
  <b><a href="http://127.0.0.1:8000">http://127.0.0.1:8000</a></b>
</p>
"# presentacion-semillero" 
