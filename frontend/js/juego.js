export const COLS = 12;
export const ROWS = 8;

export const INICIO = { x: 0, y: 0 };
export const META = { x: COLS - 1, y: ROWS - 1 };

export const DENSIDAD = 0.25;
export const MS_POR_PASO = 170;

export const DIRS = {
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
};

export const DIRS_ES = {
  right: "derecha",
  left: "izquierda",
  down: "abajo",
  up: "arriba",
};

export const SIN_MOVIMIENTO = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function bfs(muros, desde) {
  const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
  dist[desde.y][desde.x] = 0;

  const cola = [desde];
  for (let i = 0; i < cola.length; i++) {
    const { x, y } = cola[i];
    for (const d of Object.values(DIRS)) {
      const nx = x + d.x;
      const ny = y + d.y;
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
      if (muros[ny][nx] || dist[ny][nx] !== Infinity) continue;
      dist[ny][nx] = dist[y][x] + 1;
      cola.push({ x: nx, y: ny });
    }
  }
  return dist;
}

export function generarLaberinto() {
  while (true) {
    const muros = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {

        if (x === INICIO.x && y === INICIO.y) continue;
        if (x === META.x && y === META.y) continue;
        muros[y][x] = Math.random() < DENSIDAD;
      }
    }

    const optimo = bfs(muros, INICIO)[META.y][META.x];
    if (optimo !== Infinity) return { muros, optimo };
  }
}

export const TOKENS_BASE = 135;
export const TOKENS_LIBRES = 16;

export const PESO_RUTA = 0.7;
export const PESO_TOKENS = 0.3;

export function tokensDelJugador(tokensEntrada) {
  return Math.max(0, Math.round(tokensEntrada ?? 0) - TOKENS_BASE);
}

export function calcularPuntaje(pasos, optimo, tokensJugador = 0) {
  if (pasos <= 0) return 0;

  const efRuta = Math.min(1, optimo / pasos);
  const efTokens = TOKENS_LIBRES / Math.max(tokensJugador, TOKENS_LIBRES);

  return Math.max(5, Math.round(100 * (PESO_RUTA * efRuta + PESO_TOKENS * efTokens)));
}
