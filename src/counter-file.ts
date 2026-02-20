import { readFile, writeFile } from "fs/promises";
import streamDeck from "@elgato/streamdeck";

export const INCREMENT_ACTION_UUID = "com.rodolfo-cuevas.winlose-obs-counter.increment";

export type CounterType = "win" | "lose" | "reset";

/** Parsea una línea "win-lose" (ej. "1-5") y devuelve [win, lose] o null. */
export function parseWinLose(line: string): [string, string] | null {
	const parts = line.trim().split("-").map((p) => p.trim());
	if (parts.length >= 2 && parts[0] !== "" && parts[1] !== "") return [parts[0], parts[1]];
	return null;
}

/** Devuelve el título a mostrar según el tipo de botón y los valores win/lose. */
export function titleForType(win: string, lose: string, type: CounterType | undefined): string {
	switch (type) {
		case "win":
			return win;
		case "lose":
			return lose;
		case "reset":
			return "RESET";
		default:
			return win;
	}
}

/** Lee el archivo y actualiza el título de la acción según type (win/lose/reset). */
export async function refreshTitleFromFile(
	act: { setTitle(title: string): void | Promise<void> },
	filePath: string,
	type: CounterType | undefined
): Promise<void> {
	try {
		const content = await readFile(filePath, "utf-8");
		const firstLine = content.trim().split("\n")[0] ?? "";
		const parsed = parseWinLose(firstLine);
		if (!parsed) {
			await act.setTitle("?");
			return;
		}
		const [win, lose] = parsed;
		await act.setTitle(titleForType(win, lose, type ?? "win"));
	} catch {
		await act.setTitle("Error");
	}
}

/** Incrementa en el archivo el contador Win (primer número) o Lose (segundo) y escribe la línea "win-lose". */
export async function incrementCounterInFile(
	filePath: string,
	type: "win" | "lose"
): Promise<void> {
	const content = await readFile(filePath, "utf-8");
	const firstLine = content.trim().split("\n")[0] ?? "";
	const parsed = parseWinLose(firstLine);

	let winNum = 0;
	let loseNum = 0;
	if (parsed) {
		winNum = parseInt(parsed[0], 10) || 0;
		loseNum = parseInt(parsed[1], 10) || 0;
	}

	if (type === "win") {
		winNum += 1;
	} else {
		loseNum += 1;
	}

	await writeFile(filePath, `${winNum}-${loseNum}`, "utf-8");
}

/** Refresca el título de todas las teclas Counter (Win/Lose) que usan el mismo archivo que se acaba de resetear. */
export function refreshAllCounterDisplays(resetFilePath: string): void {
	streamDeck.actions.forEach((action) => {
		if (action.manifestId !== INCREMENT_ACTION_UUID) return;
		if (!action.isKey()) return;

		void action.getSettings().then((settings: Record<string, unknown>) => {
			const path = settings["txt-file"] as string | undefined;
			const type = settings.type as CounterType | undefined;
			if (path === resetFilePath && path && (type === "win" || type === "lose")) {
				void refreshTitleFromFile(action, path, type);
			}
		});
	});
}
