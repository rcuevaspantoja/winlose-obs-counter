# Win/Lose OBS Counter — Elgato Store Description

Use this text in the **Description** field when submitting your plugin to the Elgato Marketplace.

---

## Short description (for summary / tagline)

**Track wins and losses on your Stream Deck and display the score in OBS using a single text file.**

---

## Full description

**Win/Lose OBS Counter** lets you manage a simple win/loss score from your Stream Deck and show it live in OBS Studio (or any app that can read a text file).

**How it works**

- You choose one **.txt file** on your computer. The plugin keeps the score in that file in the format `wins-losses` (e.g. `3-2`).
- **Increment Counter** keys can be set as **Win** or **Lose**. Each press updates the number in the file and the key label.
- A **Reset Counter** key sets the file back to `0-0`.
- All keys that use the same file stay in sync: when you press Win, Lose, or Reset, every related key updates immediately.

**OBS integration**

- In OBS, add a **Text (GDI+, FreeType 2, or similar) source**.
- In the source settings, enable **Read from file** and select the **same .txt file** you configured in the plugin.
- OBS will show the current `wins-losses` (e.g. `3-2`) on stream. You can style the text (font, size, color) in OBS as usual.
- No extra software or browser sources are required—just one shared text file.

**Features**

- One shared text file for all counters; easy to point OBS to the same file.
- Optional **cooldown** (e.g. 3 seconds) to avoid double counts.
- Separate visuals for Win and Lose keys.
- Reset action to start a new round.

**Ideal for**

- Match or game win/loss counters on stream
- Set or round scoreboards
- Any overlay that needs a simple, file-based counter readable by OBS

---

## Keywords / tags (suggested)

`OBS`, `streaming`, `counter`, `win lose`, `score`, `text file`, `overlay`, `Stream Deck`
