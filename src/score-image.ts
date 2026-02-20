/** Colores del score: wins verde, losses rojo. */
const COLOR_WIN = "#34792b";
const COLOR_LOSE = "#d3212d";
const COLOR_SEP = "#cccccc";

const SIZE = 144;

/**
 * Genera un SVG que muestra el score "win-lose" con wins en verde y losses en rojo.
 * Tamaño 144x144 para Stream Deck.
 */
export function scoreToSvgDataUrl(win: string, lose: string): string {
	const winWidth = estimateTextWidth(win, 36);
	const sepWidth = estimateTextWidth("-", 36);
	const loseWidth = estimateTextWidth(lose, 36);
	const totalWidth = winWidth + sepWidth + loseWidth;
	// Pequeño ajuste hacia abajo: en muchas fuentes el centro óptico queda algo por debajo del centro matemático
	const y = SIZE / 2 + 12;
	const xWin = (SIZE - totalWidth) / 2 + winWidth / 2;
	const xSep = (SIZE - totalWidth) / 2 + winWidth + sepWidth / 2;
	const xLose = (SIZE - totalWidth) / 2 + winWidth + sepWidth + loseWidth / 2;

	const svgFinal = [
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`,
		`<rect width="100%" height="100%" fill="#000000"/>`,
		`<text x="${xWin}" y="${y}" dominant-baseline="central" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="${COLOR_WIN}">${escapeXml(win)}</text>`,
		`<text x="${xSep}" y="${y}" dominant-baseline="central" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="${COLOR_SEP}">-</text>`,
		`<text x="${xLose}" y="${y}" dominant-baseline="central" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="${COLOR_LOSE}">${escapeXml(lose)}</text>`,
		"</svg>",
	].join("");

	return "data:image/svg+xml;base64," + Buffer.from(svgFinal, "utf-8").toString("base64");
}

function escapeXml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** Aproximación de ancho de texto (Arial bold ~0.6em por carácter para números). */
function estimateTextWidth(text: string, fontSize: number): number {
	return text.length * fontSize * 0.6;
}
