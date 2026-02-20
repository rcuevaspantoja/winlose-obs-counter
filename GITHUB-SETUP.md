# Subir el plugin a tu cuenta de GitHub

El repositorio git ya está inicializado y el primer commit está hecho. Para crear el repo en GitHub y subir el código:

## 1. Crear el repositorio en GitHub

1. Entra en [github.com/new](https://github.com/new).
2. **Repository name:** `winlose-obs-counter`
3. **Description:** (opcional) `Plugin Stream Deck: contador Win/Lose en archivo de texto para OBS`
4. Elige **Public**.
5. **No** marques "Add a README", ".gitignore" ni "license" (ya existen en el proyecto).
6. Pulsa **Create repository**.

## 2. Conectar y subir

En la terminal, desde la carpeta del proyecto (`winlose-obs-counter`), ejecuta (sustituye `TU_USUARIO` por tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU_USUARIO/winlose-obs-counter.git
git branch -M main
git push -u origin main
```

Si prefieres SSH:

```bash
git remote add origin git@github.com:TU_USUARIO/winlose-obs-counter.git
git branch -M main
git push -u origin main
```

Después de esto, el código quedará en tu GitHub.
