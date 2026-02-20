# Desarrollo del plugin

## Por qué no se ven los cambios de íconos o del manifest

Según la documentación del SDK de Stream Deck:

- **`npm run watch`** solo recompila el código (Rollup) y ejecuta **`streamdeck restart`**.
- **`streamdeck restart`** reinicia únicamente el **proceso del plugin** (Node.js). **No** reinicia la aplicación Stream Deck.
- La **aplicación Stream Deck** (el programa de escritorio) lee el `manifest.json` y los íconos (categoría, acciones) **solo al iniciar** y los mantiene en memoria. Por eso los cambios en íconos o en el manifest **no se ven** hasta que no cierres y vuelvas a abrir la app.

## Cómo ver los cambios de íconos y del manifest

1. **Cierra por completo la aplicación Stream Deck** (salir del programa, no solo minimizar).
2. **Vuelve a abrir Stream Deck.**

Después de eso, la app volverá a leer `manifest.json` y las imágenes; deberías ver los íconos actualizados en la categoría y en la lista de acciones.

## Desarrollo con enlace al proyecto (recomendado)

Si instalaste el plugin **copiando** la carpeta `.sdPlugin` a la carpeta de plugins de Stream Deck, la app usa una **copia**. Los cambios que hagas en la carpeta del proyecto no se reflejan en esa copia.

Para que Stream Deck use **siempre** los archivos del proyecto (y así ver cambios en manifest e íconos al reiniciar la app):

```bash
npx streamdeck link com.rodolfo-cuevas.winlose-obs-counter.sdPlugin
```

Ejecuta el comando desde la **raíz del proyecto** (donde está `package.json`). Esto crea un enlace en la carpeta de plugins de Stream Deck hacia tu carpeta `.sdPlugin`. Después:

1. Cierra Stream Deck por completo.
2. Vuelve a abrir Stream Deck.

A partir de entonces, cualquier cambio en `manifest.json` o en `imgs/` se verá al **reiniciar la aplicación Stream Deck** (cerrar y abrir de nuevo).

## Resumen

| Qué cambias              | Qué hacer para ver el cambio                          |
|--------------------------|--------------------------------------------------------|
| Código TypeScript/JS     | `npm run watch` ya hace `streamdeck restart` → se ve |
| manifest.json o íconos   | **Cerrar y volver a abrir la aplicación Stream Deck** |
