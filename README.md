# Growpipe — sitio web

Sitio de una página para [growpipe.co](https://growpipe.co), servido como archivos estáticos con Cloudflare Workers.

## Estructura

- `public/` — archivos del sitio. Todo lo que esté aquí se publica:
  - `index.html` — la página.
  - `404.html` — respuesta para rutas que no existen.
  - `_headers` — cabeceras de seguridad (incluye una política CSP).
  - `robots.txt`, `sitemap.xml`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png`.
- `wrangler.jsonc` — configuración del Worker y del dominio.

## Probar en local

```sh
npx wrangler dev
```

## Desplegar

```sh
npx wrangler deploy
```

Requiere una sesión iniciada en Cloudflare (`npx wrangler login`).

## Notas

- El sitio responde solo en `growpipe.co`. `www.growpipe.co` redirige a `growpipe.co` mediante una regla de Cloudflare (no está en este repositorio).
- `workers.dev` y las URLs de vista previa están desactivadas a propósito (`workers_dev` y `preview_urls` en `false`).
- No hay código de servidor ni secretos: solo contenido estático.
- Si agregas recursos externos (otra fuente, un script de analítica, un formulario de terceros), actualiza la política `Content-Security-Policy` en `public/_headers`; si no, el navegador los bloqueará.
