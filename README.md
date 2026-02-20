# Win/Lose OBS Counter

Plugin para **Elgato Stream Deck** que mantiene un contador de victorias y derrotas en un archivo de texto. Pensado para usarlo en directo: puedes mostrar el marcador en **OBS** como fuente de texto y actualizarlo desde el Stream Deck.

## Qué hace

- **Increment Counter**: Botones para sumar una victoria o una derrota. Los valores se guardan en un archivo de texto en formato `win-lose` (por ejemplo `3-1`).
- **Score Display**: Muestra el resultado total (victorias-derrotas) en la tecla, en verde o rojo. Solo lectura.
- **Reset Counter**: Pone el contador a 0-0.

El archivo es un simple `.txt` con una línea `win-lose`. En OBS añades una **Fuente de texto** que lee ese archivo y se actualiza cuando cambias los valores desde el Stream Deck.

## Requisitos

- Stream Deck (app 6.9 o superior)
- Node.js 20 (para compilar)
- Windows 10+ o macOS 12+

## Instalación

1. Clona el repositorio.
2. En la raíz del proyecto:
   ```bash
   npm install
   npm run build
   ```
3. Instala el plugin en Stream Deck:
   - **Windows**: copia la carpeta `com.rodolfo-cuevas.winlose-obs-counter.sdPlugin` a `%APPDATA%\Elgato\StreamDeck\Plugins\`
   - **macOS**: copia la misma carpeta a `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`
4. Reinicia la aplicación Stream Deck.

Para desarrollo puedes enlazar el plugin en lugar de copiarlo:

```bash
npx streamdeck link com.rodolfo-cuevas.winlose-obs-counter.sdPlugin
```

## Uso en OBS

1. Crea un archivo de texto (por ejemplo `C:\stream\score.txt`) y escribe en la primera línea: `0-0`.
2. En el Stream Deck, añade una acción **Increment Counter** (o **Score Display** / **Reset Counter**).
3. En la configuración de la acción, indica la ruta de ese archivo y el tipo (Win o Lose) si aplica.
4. En OBS, añade una **Fuente** → **Texto (GDI+)** (o “Leer desde archivo” si tu versión lo permite) y apunta al mismo archivo. Así el texto en pantalla se actualiza cuando cambias el contador desde el Stream Deck.

## Desarrollo

- `npm run build` — compila el plugin.
- `npm run watch` — compila en modo watch y reinicia el plugin al guardar. Para ver cambios de íconos o del manifest, cierra y vuelve a abrir la app Stream Deck.

Más detalles en [DEVELOP.md](DEVELOP.md).

## Autor

Rodolfo Cuevas
