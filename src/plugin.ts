import streamDeck from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";
import { ResetCounter } from "./actions/reset-counter";
import { ScoreDisplay } from "./actions/score-display";

streamDeck.logger.setLevel("trace");

streamDeck.actions.registerAction(new IncrementCounter());
streamDeck.actions.registerAction(new ResetCounter());
streamDeck.actions.registerAction(new ScoreDisplay());

streamDeck.connect();
