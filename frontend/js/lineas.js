import { construirVitrina } from "./vitrinas.js?v=99";

const DIAGRAMAS = {

  histograma: `
    <rect class="tenue" x="4"    y="16"   width="6" height="6.5"/>
    <rect class="tenue" x="11.5" y="12"   width="6" height="10.5"/>
    <rect class="tenue" x="19"   y="8"    width="6" height="14.5"/>
    <rect class="tenue" x="26.5" y="12.5" width="6" height="10"/>
    <rect class="tenue" x="34"   y="17"   width="6" height="5.5"/>
    <line x1="2.5" y1="22.5" x2="41.5" y2="22.5"/>
    <path d="M3 21.5 Q22 -8 41 21.5"/>`,

  frontera: `
    <line class="guion" x1="4" y1="22" x2="40" y2="4"/>
    <circle cx="10" cy="8"  r="2.3"/>
    <circle cx="17.5" cy="5" r="2.3"/>
    <circle cx="13" cy="14" r="2.3"/>
    <rect class="lleno" x="25.5" y="18" width="4.4" height="4.4"/>
    <rect class="lleno" x="32.5" y="15" width="4.4" height="4.4"/>
    <rect class="lleno" x="28"   y="11" width="4.4" height="4.4"/>`,

  despliegue: `
    <rect x="2" y="8" width="13" height="10"/>
    <circle class="lleno" cx="8.5" cy="13" r="2.4"/>
    <line x1="17" y1="13" x2="23" y2="13"/>
    <polyline points="21,11 23,13 21,15"/>
    <rect x="26" y="4"    width="16" height="5"/>
    <rect x="26" y="10.5" width="16" height="5"/>
    <rect x="26" y="17"   width="16" height="5"/>
    <circle class="lleno" cx="29" cy="6.5"  r="1"/>
    <circle class="lleno" cx="29" cy="13"   r="1"/>
    <circle class="lleno" cx="29" cy="19.5" r="1"/>`,

  capas: `
    <line x1="1.5" y1="13" x2="7" y2="13"/>
    <polyline points="5,11 7,13 5,15"/>
    <rect x="9" y="3.5" width="26" height="5.5"/>
    <rect x="9" y="10.5" width="26" height="5.5"/>
    <rect x="9" y="17.5" width="26" height="5.5"/>
    <line class="tenue-trazo" x1="22" y1="9"    x2="22" y2="10.5"/>
    <line class="tenue-trazo" x1="22" y1="16"   x2="22" y2="17.5"/>
    <line x1="37" y1="13" x2="42.5" y2="13"/>
    <polyline points="40.5,11 42.5,13 40.5,15"/>`,

  bucle: `
    <line class="tenue-trazo" x1="20" y1="13" x2="20" y2="6"/>
    <line class="tenue-trazo" x1="20" y1="13" x2="14" y2="19"/>
    <line class="tenue-trazo" x1="20" y1="13" x2="26" y2="19"/>
    <rect class="lleno" x="17.7" y="2.4"  width="4.6" height="4.6"/>
    <rect class="lleno" x="11.7" y="17.4" width="4.6" height="4.6"/>
    <rect class="lleno" x="23.7" y="17.4" width="4.6" height="4.6"/>
    <circle class="lleno" cx="20" cy="13" r="3.6"/>
    <path d="M32 4.5 A 12.5 12.5 0 0 1 32 21.5"/>
    <polyline points="34.6,19.2 31.6,21.8 30.9,18"/>`,

  recuperar: `
    <rect class="tenue" x="2" y="4" width="9" height="13"/>
    <rect x="5.5" y="7" width="9" height="13"/>
    <line x1="7.5" y1="11.5" x2="12.5" y2="11.5"/>
    <line x1="7.5" y1="15"   x2="11"   y2="15"/>
    <line x1="17" y1="13" x2="23" y2="13"/>
    <polyline points="21,11 23,13 21,15"/>
    <line x1="27.5" y1="6"  x2="33.5" y2="13.5"/>
    <line x1="41"   y1="8"  x2="33.5" y2="13.5"/>
    <line x1="38"   y1="21" x2="33.5" y2="13.5"/>
    <circle class="lleno" cx="27.5" cy="6"    r="2.2"/>
    <circle class="lleno" cx="41"   cy="8"    r="2.2"/>
    <circle class="lleno" cx="38"   cy="21"   r="2.2"/>
    <circle class="lleno" cx="33.5" cy="13.5" r="2.8"/>`,

  chip: `
    <line x1="7"  y1="9"  x2="11" y2="9"/>
    <line x1="7"  y1="13" x2="11" y2="13"/>
    <line x1="7"  y1="17" x2="11" y2="17"/>
    <line x1="33" y1="9"  x2="37" y2="9"/>
    <line x1="33" y1="13" x2="37" y2="13"/>
    <line x1="33" y1="17" x2="37" y2="17"/>
    <line x1="16" y1="1.5" x2="16" y2="5"/>
    <line x1="22" y1="1.5" x2="22" y2="5"/>
    <line x1="28" y1="1.5" x2="28" y2="5"/>
    <line x1="16" y1="21"  x2="16" y2="24.5"/>
    <line x1="22" y1="21"  x2="22" y2="24.5"/>
    <line x1="28" y1="21"  x2="28" y2="24.5"/>
    <rect x="11" y="5" width="22" height="16"/>
    <rect x="16" y="9" width="12" height="8"/>
    <line class="tenue-trazo" x1="20" y1="9"  x2="20" y2="17"/>
    <line class="tenue-trazo" x1="24" y1="9"  x2="24" y2="17"/>
    <line class="tenue-trazo" x1="16" y1="13" x2="28" y2="13"/>`,

  reparto: `
    <path d="M6.5 13 C10 13 11 5 14 5"/>
    <path d="M6.5 13 H14"/>
    <path d="M6.5 13 C10 13 11 21 14 21"/>
    <path d="M30 5 C33 5 34 13 37.5 13"/>
    <path d="M30 13 H37.5"/>
    <path d="M30 21 C33 21 34 13 37.5 13"/>
    <line class="tenue-trazo" x1="14" y1="5"  x2="30" y2="5"/>
    <line class="tenue-trazo" x1="14" y1="13" x2="30" y2="13"/>
    <line class="tenue-trazo" x1="14" y1="21" x2="30" y2="21"/>
    <rect class="lleno" x="16" y="3.4"  width="3.6" height="3.2"/>
    <rect class="lleno" x="22" y="11.4" width="3.6" height="3.2"/>
    <rect class="lleno" x="26" y="19.4" width="3.6" height="3.2"/>
    <circle class="lleno" cx="4"  cy="13" r="2.6"/>
    <circle class="lleno" cx="40" cy="13" r="2.6"/>`,

  ciclo: `
    <rect x="3"  y="3.5" width="10" height="9"/>
    <rect x="17" y="3.5" width="10" height="9"/>
    <rect x="31" y="3.5" width="10" height="9"/>
    <line x1="13" y1="8" x2="17" y2="8"/>
    <polyline points="15.4,6.4 17,8 15.4,9.6"/>
    <line x1="27" y1="8" x2="31" y2="8"/>
    <polyline points="29.4,6.4 31,8 29.4,9.6"/>
    <path class="guion" d="M36 12.5 V20 H8 V13.8"/>
    <polyline points="6.4,15.4 8,13.8 9.6,15.4"/>`,
};

const LINEAS = {
  ds: {
    alias: "Data Science & Machine Learning",
    titulo: "Ciencia de Datos y Aprendizaje Automático",
    esencia: "Del dato crudo al modelo en producción.",
    temas: [
      { nombre: "Estadística y minería de datos", dgm: "histograma" },
      { nombre: "Aprendizaje automático y profundo", dgm: "frontera" },
      { nombre: "Modelos en producción", dgm: "despliegue" },
    ],
  },
  ia: {
    alias: "AI & Intelligent Systems",
    titulo: "Inteligencia Artificial y Sistemas Inteligentes",
    esencia: "De los modelos de lenguaje a los agentes que actúan.",
    temas: [
      { nombre: "Modelos de lenguaje y Transformers", dgm: "capas" },
      { nombre: "Agentes inteligentes", dgm: "bucle" },
      { nombre: "RAG y GraphRAG", dgm: "recuperar" },
    ],
  },
  hpc: {
    alias: "High Performance Computing",
    titulo: "Computación de Alto Desempeño e Infraestructura para IA",
    esencia: "El cómputo que entrena y sostiene la IA.",
    temas: [
      { nombre: "Programación en GPU", dgm: "chip" },
      { nombre: "Cómputo paralelo y distribuido", dgm: "reparto" },
      { nombre: "MLOps y LLMOps", dgm: "ciclo" },
    ],
  },
};

const ficha = document.getElementById("ficha");
const fichaViz = ficha.querySelector(".ficha-viz");
const fichaAlias = ficha.querySelector(".ficha-alias");
const fichaTitulo = ficha.querySelector(".ficha-titulo");
const fichaEsencia = ficha.querySelector(".ficha-esencia");
const fichaTemas = ficha.querySelector(".ficha-temas");

function abrir(clave) {
  const linea = LINEAS[clave];
  if (!linea) return;

  ficha.dataset.linea = clave;

  fichaAlias.textContent = linea.alias;
  fichaTitulo.textContent = linea.titulo;
  fichaEsencia.textContent = linea.esencia;

  fichaTemas.innerHTML = "";
  linea.temas.forEach((tema, i) => {
    const item = document.createElement("li");
    item.innerHTML =
      `<svg viewBox="0 0 44 26" aria-hidden="true">${DIAGRAMAS[tema.dgm]}</svg>`;

    const nombre = document.createElement("span");
    nombre.textContent = tema.nombre;
    item.append(nombre);

    item.style.animationDelay = `${i * 0.07}s`;
    fichaTemas.append(item);
  });

  fichaViz.innerHTML = "";
  const svg = construirVitrina(clave);
  if (svg) fichaViz.append(svg);

  ficha.showModal();
}

for (const tarjeta of document.querySelectorAll(".linea")) {
  tarjeta.addEventListener("click", () => abrir(tarjeta.dataset.linea));
}

ficha.querySelector(".ficha-cerrar").addEventListener("click", () => ficha.close());

ficha.addEventListener("click", (ev) => {
  if (ev.target === ficha) ficha.close();
});

ficha.addEventListener("close", () => { fichaViz.innerHTML = ""; });
