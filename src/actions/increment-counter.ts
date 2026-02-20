import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
	WillDisappearEvent,
} from "@elgato/streamdeck";
import {
	incrementCounterInFile,
	refreshAllCounterDisplays,
	refreshTitleFromFile,
} from "../counter-file";
import { refreshAllScoreDisplays } from "./score-display";

const COOLDOWN_MS = 3000;

/** Ruta de imagen según type: win → key, lose → key-lose. */
const IMAGE_WIN = "imgs/actions/demo/key";
const IMAGE_LOSE = "imgs/actions/demo/key-lose";

/** Por tecla (action.id): timestamp del último incremento para "prevent double input". */
const lastIncrementByContext = new Map<string, number>();

async function setImageByType(
	action: { setImage(image: string): Promise<void> },
	type: CounterSettings["type"]
): Promise<void> {
	const path = type === "lose" ? IMAGE_LOSE : IMAGE_WIN;
	await action.setImage(path);
}

@action({ UUID: "com.rodolfo-cuevas.winlose-obs-counter.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
	override async onWillAppear(ev: WillAppearEvent<CounterSettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];
		const type = ev.payload.settings.type ?? "win";

		if (!filePath || filePath.trim() === "") {
			await ev.action.setTitle("No file");
			return;
		}

		
		await setImageByType(ev.action, type);
		await refreshTitleFromFile(ev.action, filePath, type);
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<CounterSettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];
		const type = ev.payload.settings.type ?? "win";

		await setImageByType(ev.action, type);
		if (filePath?.trim()) {
			await refreshTitleFromFile(ev.action, filePath, type);
		}
	}

	override onWillDisappear(ev: WillDisappearEvent<CounterSettings>): void {
		lastIncrementByContext.delete(ev.action.id);
	}

	override async onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
		const filePath = ev.payload.settings["txt-file"];
		const type = ev.payload.settings.type ?? "win";
		const preventDoubleInput = ev.payload.settings.preventDoubleInput === true;

		if (!filePath || filePath.trim() === "") {
			await ev.action.setTitle("No file");
			await ev.action.showAlert();
			streamDeck.logger.warn("WinLose Counter: txt file not configured.");
			return;
		}

		if (type !== "win" && type !== "lose") {
			await ev.action.showAlert();
			return;
		}

		if (preventDoubleInput) {
			const last = lastIncrementByContext.get(ev.action.id) ?? 0;
			if (Date.now() - last < COOLDOWN_MS) {
				return;
			}
		}

		try {
			await incrementCounterInFile(filePath, type);
			if (preventDoubleInput) {
				lastIncrementByContext.set(ev.action.id, Date.now());
			}
			await refreshTitleFromFile(ev.action, filePath, type);
			refreshAllCounterDisplays(filePath);
			refreshAllScoreDisplays(filePath);
			await ev.action.showOk();
			streamDeck.logger.info(`WinLose Counter: ${type} +1 → ${filePath}`);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			await ev.action.setTitle("Error");
			await ev.action.showAlert();
			streamDeck.logger.error(`WinLose Counter: error ${filePath} - ${message}`);
		}
	}
}

/**
 * Settings for {@link IncrementCounter}.
 */
type CounterSettings = {
	count?: number;
	incrementBy?: number;
	"txt-file"?: string;
	type?: "win" | "lose" | "reset";
	preventDoubleInput?: boolean;
};
