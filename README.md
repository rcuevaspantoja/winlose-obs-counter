# Win/Lose OBS Counter

Plugin for **Elgato Stream Deck** that keeps a win/lose counter in a text file. Designed for live streaming: you can show the score in **OBS** as a text source and update it from the Stream Deck.

## What it does

- **Increment Counter**: Buttons to add a win or a loss. Values are stored in a text file in `win-lose` format (e.g. `3-1`).
- **Score Display**: Shows the total score (wins minus losses) on the key in green or red. Read-only.
- **Reset Counter**: Resets the counter to 0-0.

The file is a plain `.txt` with a single `win-lose` line. In OBS you add a **Text** source that reads that file and updates when you change the values from the Stream Deck.

## Requirements

- Stream Deck (app 6.9 or higher)
- Node.js 20 (to build)
- Windows 10+ or macOS 12+

## Installation

1. Clone the repository.
2. In the project root:
   ```bash
   npm install
   npm run build
   ```
3. Install the plugin in Stream Deck:
   - **Windows**: copy the folder `com.rodolfo-cuevas.winlose-obs-counter.sdPlugin` to `%APPDATA%\Elgato\StreamDeck\Plugins\`
   - **macOS**: copy the same folder to `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`
4. Restart the Stream Deck application.

For development you can link the plugin instead of copying it:

```bash
npx streamdeck link com.rodolfo-cuevas.winlose-obs-counter.sdPlugin
```

## Using with OBS

1. Create a text file (e.g. `C:\stream\score.txt`) and write on the first line: `0-0`.
2. In Stream Deck, add an **Increment Counter** action (or **Score Display** / **Reset Counter**).
3. In the action settings, set the path to that file and the type (Win or Lose) if applicable.
4. In OBS, add a **Source** → **Text (GDI+)** (or “Read from file” if your version supports it) and point it to the same file. The on-screen text will update when you change the counter from the Stream Deck.

## Development

- `npm run build` — builds the plugin.
- `npm run watch` — builds in watch mode and restarts the plugin on save. To see icon or manifest changes, quit and reopen the Stream Deck app.

## Author

Rodolfo Cuevas
