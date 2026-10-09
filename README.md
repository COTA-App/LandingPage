# Cota · página web

Landing de Cota: presentación, capturas, precio y descarga.

Es HTML estático con Vite y Tailwind v4. Usa los mismos colores y nombres que la app (`COTA/src/index.css`), y el modo oscuro sigue al sistema. La página final no lleva JavaScript.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/, lo que se publica
npm run preview   # sirve dist/ para revisarlo
```

## Qué se cambia y dónde

- **Links, precio y redes:** `src/config.ts`. Un valor vacío oculta su botón: hoy están ocultos LinkedIn, Instagram y el mail, y Microsoft Store dice "Próximamente". Los precios (mensual y anual) tienen que coincidir con los del servidor. Los valores se aplican al compilar, en el plugin de `vite.config.ts`. En el HTML:
  - `{{clave}}` se reemplaza por el valor;
  - `<!-- si:clave -->…<!-- /si -->` se muestra solo si hay valor;
  - `<!-- no:clave -->…<!-- /no -->` se muestra solo si no hay valor.
- **Textos:** `index.html`.
- **Estilos:** `src/estilos.css`. El bloque `@theme` es copia del de la app. Si cambia allá, copiarlo acá.
- **Capturas:** `public/capturas/<pantalla>-claro.webp` y `-oscuro.webp`, a 2x (2720×1700). Se sacan de Cota con datos de ejemplo, nunca con datos reales. Para convertirlas: `magick captura.png -quality 82 -define webp:method=6 captura.webp`.

## Página de vuelta del pago

`pago.html` es adonde Mercado Pago manda al cliente después de pagar: es el secreto `URL_VUELTA` del servidor de licencias.
- Muestra cómo salió el pago (aprobado, en proceso o rechazado) según lo que Mercado Pago agrega a la URL. La lógica está en `src/pago.ts`.
- Abre Cota con el link `cota://pago`: Cota pasa al frente, valida la licencia en el momento y muestra *Configuración → Licencia*.
- El mensaje es solo informativo: la licencia se activa por lo que el servidor le pregunta a Mercado Pago, nunca por esta página.

## Política de privacidad

`privacidad.html` es la política de privacidad: su URL es la que se carga en Microsoft Store (*Propiedades*). Está enlazada desde el pie de la portada.
- Describe lo que hace Cota de verdad: qué envía al servidor de licencias, qué se guarda de los pagos y qué queda solo en la PC. Si eso cambia en la app o en el servidor, hay que actualizar el texto.
- Cada vez que cambie el texto, actualizar `privacidadActualizada` en `src/config.ts`. El email de contacto es `emailPrivacidad`.

## Descarga del instalador

El botón apunta a `https://github.com/COTA-App/Downloads/releases/latest/download/Cota-Instalador.exe`:
- `Downloads` es un repo **público** que solo tiene releases. El repo de la app es privado y sus descargas piden login.
- `npm run release`, en el repo de Cota, sube ahí una copia del instalador con ese nombre fijo, así el link siempre baja la última versión.

## Publicación

El repo es público y se publica con **GitHub Pages**, en https://cota-app.github.io/LandingPage/.
- Con cada push a `main`, `.github/workflows/publicar.yml` compila y publica sola.
- La ruta `/LandingPage/` se pasa en la variable `BASE` (ver `vite.config.ts`).
- Cuando compres el dominio:
  1. Cargalo en *Settings → Pages → Custom domain*.
  2. En el workflow, cambiá `BASE` a `/`.

## Prácticas de Apple

`.claude/skills/` tiene las skills de Human Interface Guidelines de [raintree-technology/apple-hig-skills](https://github.com/raintree-technology/apple-hig-skills), con licencia MIT. Están ahí para que Claude las consulte al cambiar el diseño. Lo que se aplica acá:
- tipografía del sistema, y jerarquía con peso y tamaño;
- grises por transparencia;
- botones de 44 px de alto como mínimo;
- contraste AA en claro y en oscuro;
- `prefers-reduced-motion`;
- el contenido (las capturas) por encima de la decoración.
