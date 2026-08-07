import {
  COLS,
  ROWS,
  INICIO,
  META,
  DIRS,
  DIRS_ES,
  MS_POR_PASO,
  SIN_MOVIMIENTO,
  TOKENS_LIBRES,
  generarLaberinto,
  calcularPuntaje,
  tokensDelJugador,
} from "./juego.js?v=99";

const $ = (sel) => document.querySelector(sel);

const elTablero = $("#tablero");
const elInstruccion = $("#instruccion");
const btnEjecutar = $("#btnEjecutar");
const btnNuevo = $("#btnNuevo");
const btnLimpiar = $("#btnLimpiar");

const mPuntaje = $("#mPuntaje");
const mPasos = $("#mPasos");
const mTokens = $("#mTokens");
const mOptimo = $("#mOptimo");
const mEstado = $("#mEstado");

let muros = [];
let optimo = 0;
let celdas = [];
let token = null;
let ejecutando = false;

function estado(texto, malo = false, detalle = "") {
  mEstado.textContent = texto;
  mEstado.className = malo ? "chico malo" : "chico";

  if (detalle) mEstado.title = detalle;
  else mEstado.removeAttribute("title");
}

function resetMetricas(textoEstado = "en espera") {
  mPuntaje.textContent = "—";
  mPuntaje.classList.remove("malo");
  mPasos.textContent = "0";
  mTokens.textContent = "—";
  mTokens.classList.remove("malo");
  mTokens.removeAttribute("title");
  estado(textoEstado);
}

function pintarTokens(tokens) {
  mTokens.textContent = String(tokens);
  mTokens.classList.toggle("malo", tokens > TOKENS_LIBRES);
  mTokens.title =
    tokens > TOKENS_LIBRES
      ? `${tokens - TOKENS_LIBRES} por encima del presupuesto de ${TOKENS_LIBRES}: baja el puntaje.`
      : `dentro del presupuesto de ${TOKENS_LIBRES}: sin penalización.`;
}

const celdaEn = (x, y) => celdas[y * COLS + x];

function colocarToken(x, y) {
  token.style.setProperty("--tx", x);
  token.style.setProperty("--ty", y);
}

function marcarRastro(x, y) {
  celdaEn(x, y).classList.add("rastro");
}

function reiniciarToken() {
  for (const celda of celdas) celda.classList.remove("rastro");
  token.classList.remove("choque", "llegada");
  celdaEn(META.x, META.y).classList.remove("atrapado");
  colocarToken(INICIO.x, INICIO.y);
  marcarRastro(INICIO.x, INICIO.y);
}

function pintarTablero() {
  elTablero.innerHTML = "";
  celdas = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const celda = document.createElement("div");
      celda.className = "celda";
      if (muros[y][x]) celda.classList.add("muro");
      if (x === INICIO.x && y === INICIO.y) celda.classList.add("inicio");
      if (x === META.x && y === META.y) celda.classList.add("meta");
      elTablero.appendChild(celda);
      celdas.push(celda);
    }
  }

  token = document.createElement("div");
  token.className = "token";
  elTablero.appendChild(token);

  colocarToken(INICIO.x, INICIO.y);
  marcarRastro(INICIO.x, INICIO.y);
}

function nuevoLaberinto() {
  ({ muros, optimo } = generarLaberinto());
  pintarTablero();

  mOptimo.textContent = String(optimo);
  resetMetricas();
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

function ocupado(si) {
  btnEjecutar.disabled = si;
  btnNuevo.disabled = si;
  btnLimpiar.disabled = si;
  btnEjecutar.textContent = si ? "… cazando" : "▸ soltar al gato";
}

async function pedirMovimientos(instruccion) {
  let respuesta;
  try {
    respuesta = await fetch("/api/mover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instruccion }),
    });
  } catch {
    throw new Error("no se pudo contactar con el servidor. ¿Sigue arrancado?");
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const detalle = datos?.detail;

    if (Array.isArray(detalle)) throw new Error(detalle.map((d) => d.msg).join("; "));
    throw new Error(detalle || `error ${respuesta.status} del servidor.`);
  }
  return datos;
}

async function animar(moves, tokens) {
  let x = INICIO.x;
  let y = INICIO.y;
  let pasos = 0;

  for (const move of moves) {
    const nx = x + DIRS[move].x;
    const ny = y + DIRS[move].y;

    const fuera = nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS;
    if (fuera || muros[ny][nx]) {
      const causa = fuera
        ? `el gato intentó salir del tablero desde (${x}, ${y})`
        : `hay un muro en (${nx}, ${ny})`;

      token.classList.add("choque");
      estado("choque", true, `paso ${pasos + 1} (${move} / ${DIRS_ES[move]}): ${causa}.`);
      mPuntaje.textContent = "0";
      mPuntaje.classList.add("malo");
      return;
    }

    x = nx;
    y = ny;
    pasos++;
    colocarToken(x, y);
    marcarRastro(x, y);
    mPasos.textContent = String(pasos);

    if (x === META.x && y === META.y) {
      const puntaje = calcularPuntaje(pasos, optimo, tokens);
      token.classList.add("llegada");
      celdaEn(META.x, META.y).classList.add("atrapado");
      mPuntaje.textContent = String(puntaje);
      estado(
        "ratón atrapado",
        false,
        `${pasos} pasos (óptimo: ${optimo}) y ${tokens} tokens ` +
          `(gratis hasta ${TOKENS_LIBRES}). Puntaje: ${puntaje}/100.`
      );
      return;
    }

    if (!SIN_MOVIMIENTO) await esperar(MS_POR_PASO);
  }

  estado("se escapó", true, `el gato se quedó en (${x}, ${y}). Te faltó ruta.`);
}

async function ejecutar() {
  if (ejecutando) return;

  const instruccion = elInstruccion.value.trim();
  if (!instruccion) {
    estado("falta instrucción", true, "escribe una instrucción antes de ejecutar.");
    elInstruccion.focus();
    return;
  }

  ejecutando = true;
  ocupado(true);
  reiniciarToken();
  resetMetricas("ejecutando");

  try {
    const datos = await pedirMovimientos(instruccion);
    const tokens = tokensDelJugador(datos.tokens?.entrada);

    pintarTokens(tokens);
    await animar(datos.moves, tokens);
  } catch (error) {
    estado("error", true, error.message);
  } finally {
    ejecutando = false;
    ocupado(false);
  }
}

btnEjecutar.addEventListener("click", ejecutar);
btnNuevo.addEventListener("click", nuevoLaberinto);

btnLimpiar.addEventListener("click", () => {
  reiniciarToken();
  resetMetricas();
});

elInstruccion.addEventListener("keydown", (ev) => {
  if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
    ev.preventDefault();
    ejecutar();
  }
});

elTablero.style.setProperty("--cols", COLS);
elTablero.style.setProperty("--rows", ROWS);
nuevoLaberinto();
