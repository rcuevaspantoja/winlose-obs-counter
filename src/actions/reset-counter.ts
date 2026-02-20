import { writeFile } from "fs/promises";
import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { refreshAllCounterDisplays } from "../counter-file";
import { refreshAllScoreDisplays } from "./score-display";

/** Contenido fijo del archivo tras reset: primera línea "0-0". */
const RESET_CONTENT = "0-0";

type ResetCounterSettings = {
	"txt-file"?: string;
};

@action({ UUID: "com.rodolfo-cuevas.winlose-obs-counter.reset" })
export class ResetCounter extends SingletonAction<ResetCounterSettings> {
	override async onWillAppear(ev: WillAppearEvent<ResetCounterSettings>): Promise<void> {
		await ev.action.setTitle("RESET");
	}

	override async onKeyDown(ev: KeyDownEvent<ResetCounterSettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];

		if (!filePath || filePath.trim() === "") {
			await ev.action.setTitle("No file");
			await ev.action.showAlert();
			streamDeck.logger.warn("WinLose Reset: txt file not configured.");
			return;
		}

		try {
			await writeFile(filePath, RESET_CONTENT, "utf-8");
			refreshAllCounterDisplays(filePath);
			refreshAllScoreDisplays(filePath);
			await ev.action.setTitle("RESET");
			await ev.action.showOk();
			streamDeck.logger.info(`WinLose Reset: wrote "${RESET_CONTENT}" to ${filePath}`);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			await ev.action.setTitle("Error");
			await ev.action.showAlert();
			streamDeck.logger.error(`WinLose Reset: error writing ${filePath} - ${message}`);
		}
	}
}
