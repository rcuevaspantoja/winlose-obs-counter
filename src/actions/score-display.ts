import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";
import { readFile } from "fs/promises";
import { parseWinLose } from "../counter-file";
import { scoreToSvgDataUrl } from "../score-image";

type ScoreDisplaySettings = {
	"txt-file"?: string;
};

const SCORE_DISPLAY_UUID = "com.rodolfo-cuevas.winlose-obs-counter.score-display";

async function refreshScoreDisplay(action: { setImage(image: string): Promise<void> }, filePath: string): Promise<void> {
	try {
		const content = await readFile(filePath, "utf-8");
		const firstLine = content.trim().split("\n")[0] ?? "";
		const parsed = parseWinLose(firstLine);
		if (!parsed) {
			await action.setImage("imgs/demo/score");
			return;
		}
		const [win, lose] = parsed;
		const dataUrl = scoreToSvgDataUrl(win, lose);
		await action.setImage(dataUrl);
	} catch {
		await action.setImage("imgs/demo/score");
	}
}

@action({ UUID: SCORE_DISPLAY_UUID })
export class ScoreDisplay extends SingletonAction<ScoreDisplaySettings> {
	override async onWillAppear(ev: WillAppearEvent<ScoreDisplaySettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];
		if (!filePath || filePath.trim() === "") {
			await ev.action.setImage("imgs/demo/score");
			return;
		}
		await refreshScoreDisplay(ev.action, filePath);
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<ScoreDisplaySettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];
		if (!filePath?.trim()) {
			await ev.action.setImage("imgs/demo/score");
			return;
		}
		await refreshScoreDisplay(ev.action, filePath);
	}
}

/** Refresca todos los botones Score Display que usan el archivo indicado. */
export function refreshAllScoreDisplays(filePath: string): void {
	streamDeck.actions.forEach((action) => {
		if (action.manifestId !== SCORE_DISPLAY_UUID) return;
		if (!action.isKey()) return;
		void action.getSettings().then((settings: Record<string, unknown>) => {
			const path = settings["txt-file"] as string | undefined;
			if (path === filePath && path) {
				void refreshScoreDisplay(action, path);
			}
		});
	});
}
