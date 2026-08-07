import { BANCO, TEMAS } from "./banco.js?v=99";
import { crearGachapon } from "./gachapon.js?v=99";

const $ = (sel) => document.querySelector(sel);

const PREGUNTAS = 5;
const SEGUNDOS = 120;
const PUNTOS_ACIERTO = 100;
const PUNTOS_POR_SEGUNDO = 2;

const RANGOS = [
  { letra: "S", desde: 600, nota: "impecable" },
  { letra: "A", desde: 450, nota: "muy bien" },
  { letra: "B", desde: 300, nota: "bien" },
  { letra: "C", desde: 150, nota: "se puede mejorar" },
  { letra: "D", desde: 0, nota: "a repasar" },
];

const vista = $("#vista-preguntas");
const lobby = $("#lobby");
const hudPartida = $("#hudPartida");
const panelQuiz = $("#panelQuiz");
const panelResultado = $("#panelResultado");

const elQuiz = $("#quiz");
const btnAbandonar = $("#btnAbandonar");

const btnTirar = $("#btnTirar");

const rTiempo = $("#rTiempo");

let pantalla = "lobby";
let ronda = [];
let indice = 0;
let partida = null;

const escapar = (texto) =>
  texto.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

const conCodigo = (texto) =>
  escapar(texto).replace(/`([^`]+)`/g, "<code>$1</code>");

function normalizar(texto) {
  return texto
    .trim()
    .toLowerCase()
    .replace(/["'`]/g, '"')
    .replace(/\s+/g, " ")
    .replace(/;+$/, "");
}

const sinEspacios = (texto) => normalizar(texto).replace(/\s/g, "");

const coincide = (escrito, respuestas) =>
  respuestas.some(
    (r) => normalizar(r) === normalizar(escrito) || sinEspacios(r) === sinEspacios(escrito)
  );

function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const comoReloj = (segundos) =>
  `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, "0")}`;

const preguntasDe = (clave) =>
  clave === "todas" ? BANCO : BANCO.filter((p) => p.tema === clave);

const PANTALLAS = {
  lobby: [lobby],
  jugando: [hudPartida, panelQuiz],
  resultado: [panelResultado],
};
const TODOS = [...new Set(Object.values(PANTALLAS).flat())];

function mostrar(nombre) {
  pantalla = nombre;
  const visibles = new Set(PANTALLAS[nombre]);
  for (const nodo of TODOS) nodo.hidden = !visibles.has(nodo);
}

function tenir(clave) {
  if (clave) vista.dataset.cat = clave;
  else delete vista.dataset.cat;
}

const activas = new Set(Object.keys(TEMAS));

function pintarTemas() {
  const lista = $("#listaTemas");
  if (!lista) return;

  lista.innerHTML = "";
  for (const [clave, tema] of Object.entries(TEMAS)) {
    const chip = document.createElement("li");
    chip.dataset.tema = clave;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "tema-chip";
    const encendida = activas.has(clave);
    boton.setAttribute("aria-pressed", String(encendida));
    boton.title = !encendida
      ? "Pulsa para volver a meterla en la tirada"
      : sePuedeApagar(clave)
        ? "Pulsa para dejarla fuera de la tirada"
        : `No se puede apagar: harían falta ${PREGUNTAS} preguntas entre las encendidas`;
    boton.innerHTML =
      '<i class="cap-punto" aria-hidden="true"></i>' +
      `${escapar(tema.nombre)}<b>${preguntasDe(clave).length}</b>`;
    boton.addEventListener("click", () => alternarTema(clave));

    chip.append(boton);
    lista.append(chip);
  }
}

function sePuedeApagar(clave) {
  const quedan = [...activas]
    .filter((c) => c !== clave)
    .reduce((n, c) => n + preguntasDe(c).length, 0);
  return quedan >= PREGUNTAS;
}

function rechazar(clave) {
  const boton = $(`#listaTemas li[data-tema="${clave}"] .tema-chip`);
  if (!boton) return;
  boton.classList.add("rechazado");
  boton.addEventListener(
    "animationend",
    () => boton.classList.remove("rechazado"),
    { once: true }
  );
}

function alternarTema(clave) {
  if (activas.has(clave)) {
    if (!sePuedeApagar(clave)) return rechazar(clave);
    activas.delete(clave);
  } else {
    activas.add(clave);
  }

  pintarTemas();
  gachapon.usarCategorias([...activas]);
}

function pintarHud() {
  if (!partida) return;
  rTiempo.textContent = comoReloj(partida.segundos);
  rTiempo.classList.toggle("urgente", partida.segundos <= 20);
}

function preguntasDeCapsulas(capsulas) {
  const usadas = new Set();
  const elegidas = [];

  for (const clave of capsulas) {
    const deLaCategoria = barajar(
      BANCO.filter((p) => p.tema === clave && !usadas.has(p.id))
    );
    const suplente = barajar(
      BANCO.filter((p) => !usadas.has(p.id) && activas.has(p.tema))
    );
    const pregunta = deLaCategoria[0] ?? suplente[0];
    if (!pregunta) break;

    usadas.add(pregunta.id);
    elegidas.push(pregunta);
  }
  return elegidas;
}

function empezarPartida(capsulas) {
  const preguntas = preguntasDeCapsulas(capsulas);
  if (!preguntas.length) return;

  ronda = preguntas.map((pregunta) => ({
    pregunta,
    puntos: 0,
    marca: null,
    guardado: pregunta.tipo === "opcion" ? null : [],
  }));
  indice = 0;

  partida = { total: ronda.length, segundos: SEGUNDOS, reloj: null };

  mostrar("jugando");
  pintarPregunta();
  pintarHud();

  partida.reloj = setInterval(() => {
    partida.segundos--;
    pintarHud();
    if (partida.segundos <= 0) terminarPartida("tiempo");
  }, 1000);
}

const puntajeRonda = () => ronda.reduce((suma, e) => suma + e.puntos, 0);
const aciertosRonda = () => ronda.filter((e) => e.marca === "bien").length;

function acertada({ pregunta, guardado }) {
  if (pregunta.tipo === "opcion") return guardado === pregunta.correcta;
  const huecos = pregunta.huecos ?? [];
  if (!huecos.length) return false;
  return huecos.every(
    (h, i) => (guardado[i] ?? "").trim() !== "" && coincide(guardado[i], h.respuestas)
  );
}

function irA(destino) {
  indice = Math.min(ronda.length - 1, Math.max(0, destino));
  pintarPregunta();
  pintarHud();
}

function avanzar() {
  if (indice < ronda.length - 1) irA(indice + 1);
  else terminarPartida("completado");
}

function terminarPartida(motivo) {

  for (const entrada of ronda) {
    const bien = acertada(entrada);
    entrada.marca = bien ? "bien" : "mal";
    entrada.puntos = bien ? PUNTOS_ACIERTO : 0;
  }

  const total = ronda.length;
  const aciertos = aciertosRonda();
  const puntaje = puntajeRonda();
  const segundos = partida ? partida.segundos : 0;

  if (partida) clearInterval(partida.reloj);
  partida = null;

  const bono =
    motivo === "completado"
      ? Math.round(segundos * PUNTOS_POR_SEGUNDO * (aciertos / total))
      : 0;
  const puntosTotales = puntaje + bono;
  const rango = RANGOS.find((r) => puntosTotales >= r.desde);

  mostrar("resultado");
  tenir(null);

  panelResultado.dataset.rango = rango.letra;
  panelResultado.querySelector(".rango-letra").textContent = rango.letra;
  panelResultado.querySelector(".rango-nota").textContent = rango.nota;
  panelResultado.querySelector(".resultado-total").textContent = String(puntosTotales);

  const desglose = panelResultado.querySelector(".resultado-desglose");
  desglose.innerHTML = "";
  const filas = [
    ["aciertos", `${aciertos} de ${total}`],
    ["puntos de preguntas", String(puntaje)],
    ["bono por tiempo", bono ? `+${bono}  (${comoReloj(segundos)} de sobra)` : "—"],
  ];
  for (const [etiqueta, valor] of filas) {
    const fila = document.createElement("li");
    fila.innerHTML = `<span>${escapar(etiqueta)}</span><b>${escapar(valor)}</b>`;
    desglose.append(fila);
  }

  pintarRepaso();
}

function pintarRepaso() {
  const lista = $("#repaso");
  if (!lista) return;

  lista.innerHTML = "";
  ronda.forEach((entrada, i) => {
    const fila = document.createElement("li");
    fila.dataset.tema = entrada.pregunta.tema;
    fila.dataset.marca = entrada.marca;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "repaso-fila";
    boton.innerHTML =
      `<span class="repaso-num">${i + 1}</span>` +
      '<i class="cap-punto" aria-hidden="true"></i>' +
      `<b>${escapar(TEMAS[entrada.pregunta.tema].nombre)}</b>` +
      `<span class="repaso-marca">${entrada.marca === "bien" ? "acertada" : "fallada"}</span>` +
      '<span class="repaso-ver" aria-hidden="true">ver ›</span>';
    boton.addEventListener("click", () => abrirRepaso(i));

    fila.append(boton);
    lista.append(fila);
  });
}

const fichaRepaso = $("#repasoFicha");
const cuerpoRepaso = $("#repasoCuerpo");

function codigoRepasado(entrada) {
  const { pregunta, guardado } = entrada;
  const pre = document.createElement("pre");
  pre.className = "codigo";

  for (const trozo of pregunta.codigo.split(/(\{\{(?:\d+|\?)\}\})/g)) {
    const hueco = trozo.match(/^\{\{(\d+|\?)\}\}$/);

    if (!hueco) {
      pre.append(document.createTextNode(trozo));
      continue;
    }
    if (hueco[1] === "?") {
      const marca = document.createElement("span");
      marca.className = "hueco-opcion";
      marca.textContent = "?";
      pre.append(marca);
      continue;
    }

    const escrito = (guardado[Number(hueco[1])] ?? "").trim();
    const visto = document.createElement("span");
    visto.className = "hueco-visto";
    visto.classList.toggle("vacio", !escrito);
    visto.textContent = escrito || "en blanco";
    pre.append(visto);
  }

  return pre;
}

function abrirRepaso(i) {
  const entrada = ronda[i];
  if (!entrada || !fichaRepaso) return;
  const { pregunta } = entrada;

  fichaRepaso.dataset.tema = pregunta.tema;
  cuerpoRepaso.innerHTML = "";

  const cabecera = document.createElement("div");
  cabecera.className = "pregunta-cabecera";
  cabecera.innerHTML =
    `<span class="cat"><i class="punto"></i>${escapar(TEMAS[pregunta.tema].nombre)}</span>`;
  cuerpoRepaso.append(cabecera);

  const enunciado = document.createElement("p");
  enunciado.className = "enunciado";
  enunciado.id = "repasoTitulo";
  enunciado.innerHTML = conCodigo(pregunta.enunciado);
  cuerpoRepaso.append(enunciado);

  if (pregunta.datos) cuerpoRepaso.append(bloque("datos", pregunta.datos, "datos"));
  if (pregunta.codigo) cuerpoRepaso.append(codigoRepasado(entrada));

  if (pregunta.tipo === "opcion") {
    const caja = document.createElement("div");
    caja.className = "opciones";
    pregunta.opciones.forEach((texto, j) => {
      const fila = document.createElement("div");
      fila.className = "opcion";

      fila.classList.toggle("elegida", entrada.guardado === j);
      fila.innerHTML =
        `<span class="tecla">${j + 1}</span><span class="txt">${escapar(texto)}</span>`;
      caja.append(fila);
    });
    cuerpoRepaso.append(caja);
  }

  if (pregunta.salida) cuerpoRepaso.append(bloque("salida esperada", pregunta.salida, "salida"));
  if (pregunta.figura) {
    const caja = document.createElement("div");
    caja.className = "bloque figura";
    caja.innerHTML =
      '<div class="rotulo">resultado esperado</div>' +
      `<img src="assets/figuras/${escapar(pregunta.figura)}" alt="Gráfico del resultado esperado">`;
    cuerpoRepaso.append(caja);
  }

  fichaRepaso.showModal();
}

if (fichaRepaso) {
  fichaRepaso.querySelector(".ficha-cerrar")
    .addEventListener("click", () => fichaRepaso.close());

  fichaRepaso.addEventListener("click", (ev) => {
    if (ev.target === fichaRepaso) fichaRepaso.close();
  });
}

function abandonar() {
  if (partida) clearInterval(partida.reloj);
  partida = null;
  ronda = [];
  irAlLobby();
}

function irAlLobby() {

  mostrar("lobby");
  tenir(null);

  gachapon.reiniciar();
  btnTirar.disabled = false;
}

function pintarCodigo(entrada) {
  const { pregunta } = entrada;
  const pre = document.createElement("pre");
  pre.className = "codigo";

  for (const trozo of pregunta.codigo.split(/(\{\{(?:\d+|\?)\}\})/g)) {
    const hueco = trozo.match(/^\{\{(\d+|\?)\}\}$/);

    if (!hueco) {
      pre.append(document.createTextNode(trozo));
      continue;
    }

    if (hueco[1] === "?") {
      const marca = document.createElement("span");
      marca.className = "hueco-opcion";
      marca.textContent = "?";
      pre.append(marca);
      continue;
    }

    const i = Number(hueco[1]);
    const campo = document.createElement("input");
    campo.type = "text";
    campo.className = "hueco";
    campo.dataset.i = String(i);
    campo.size = pregunta.huecos[i]?.ancho ?? 16;
    campo.spellcheck = false;
    campo.autocomplete = "off";
    campo.placeholder = "escribe aquí";
    campo.setAttribute("aria-label", `hueco ${i + 1}`);
    campo.value = entrada.guardado[i] ?? "";

    campo.addEventListener("input", () => {
      entrada.guardado[i] = campo.value;
    });

    pre.append(campo);
  }

  return pre;
}

function pintarOpciones(entrada) {
  const caja = document.createElement("div");
  caja.className = "opciones";

  entrada.pregunta.opciones.forEach((texto, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion";
    boton.dataset.i = String(i);
    boton.innerHTML =
      `<span class="tecla">${i + 1}</span><span class="txt">${escapar(texto)}</span>`;

    if (entrada.guardado === i) {
      boton.classList.add("elegida");
      boton.setAttribute("aria-pressed", "true");
    }

    boton.addEventListener("click", () => marcarOpcion(i));
    caja.append(boton);
  });

  return caja;
}

function marcarOpcion(i) {
  const entrada = ronda[indice];
  if (!entrada) return;

  entrada.guardado = i;
  pintarHud();
  for (const boton of elQuiz.querySelectorAll(".opcion")) {
    const suya = Number(boton.dataset.i) === i;
    boton.classList.toggle("elegida", suya);
    boton.setAttribute("aria-pressed", String(suya));
  }
}

function bloque(titulo, contenido, clase) {
  const caja = document.createElement("div");
  caja.className = `bloque ${clase}`;
  caja.innerHTML =
    `<div class="rotulo">${escapar(titulo)}</div><pre>${escapar(contenido)}</pre>`;
  return caja;
}

function pintarPregunta() {
  const entrada = ronda[indice];
  if (!entrada) return;
  const { pregunta } = entrada;

  elQuiz.innerHTML = "";

  tenir(pregunta.tema);

  const numero = indice + 1;

  const cabecera = document.createElement("div");
  cabecera.className = "pregunta-cabecera";
  cabecera.innerHTML =
    `<span class="cat"><i class="punto"></i>${escapar(TEMAS[pregunta.tema].nombre)}</span>` +
    `<span class="cuenta">${numero} <em>/</em> ${ronda.length}</span>`;
  elQuiz.append(cabecera);

  const barra = document.createElement("div");
  barra.className = "barra-progreso";
  barra.innerHTML = `<i style="--pct:${(numero / ronda.length) * 100}%"></i>`;
  elQuiz.append(barra);

  const enunciado = document.createElement("p");
  enunciado.className = "enunciado";
  enunciado.innerHTML = conCodigo(pregunta.enunciado);
  elQuiz.append(enunciado);

  if (pregunta.datos) elQuiz.append(bloque("datos", pregunta.datos, "datos"));

  if (pregunta.codigo) {
    const rotulo = document.createElement("div");
    rotulo.className = "rotulo";

    rotulo.textContent =
      pregunta.tipo !== "opcion"
        ? "completa el código"
        : pregunta.codigo.includes("{{?}}")
          ? "elige el código que da la salida"
          : "código";
    elQuiz.append(rotulo);
    elQuiz.append(pintarCodigo(entrada));
  }

  if (pregunta.tipo === "opcion") elQuiz.append(pintarOpciones(entrada));
  if (pregunta.salida) elQuiz.append(bloque("salida esperada", pregunta.salida, "salida"));

  if (pregunta.figura) {
    const caja = document.createElement("div");
    caja.className = "bloque figura";
    caja.innerHTML =
      '<div class="rotulo">resultado esperado</div>' +
      `<img src="assets/figuras/${escapar(pregunta.figura)}" alt="Gráfico del resultado esperado">`;
    elQuiz.append(caja);
  }

  const fila = document.createElement("div");
  fila.className = "fila fila-nav";

  const ultima = indice === ronda.length - 1;
  const btnAvanzar = document.createElement("button");
  btnAvanzar.type = "button";
  btnAvanzar.id = "qAvanzar";
  btnAvanzar.className = ultima ? "primario btn-enviar" : "primario";
  btnAvanzar.textContent = ultima ? "enviar ▸" : "siguiente ›";
  btnAvanzar.addEventListener("click", avanzar);

  fila.append(btnAvanzar);
  elQuiz.append(fila);

  for (const campo of elQuiz.querySelectorAll(".hueco")) {
    campo.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter") return;
      ev.preventDefault();
      avanzar();
    });

    campo.addEventListener("input", pintarHud);
  }

  elQuiz.querySelector(".hueco")?.focus();
}

document.addEventListener("keydown", (ev) => {
  if (ev.target.matches("input, textarea")) return;
  if (vista.hidden) return;

  const entrada = ronda[indice];
  if (!entrada || entrada.pregunta.tipo !== "opcion") return;

  const n = Number(ev.key);
  if (Number.isInteger(n) && n >= 1 && n <= entrada.pregunta.opciones.length) {
    marcarOpcion(n - 1);
  }
});

const gachapon = crearGachapon(
  $("#gachapon"), Object.keys(TEMAS), PREGUNTAS,
  { alSalir: empezarPartida }
);

btnTirar.addEventListener("click", () => {
  if (gachapon.girando()) return;

  btnTirar.disabled = true;
  gachapon.accionar();
});

btnAbandonar.addEventListener("click", abandonar);

for (const boton of document.querySelectorAll("[data-ir]")) {
  boton.addEventListener("click", irAlLobby);
}

pintarTemas();
irAlLobby();
