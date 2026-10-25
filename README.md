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

- **Links, precio y redes:** `src/config.ts`. Un valor vacío oculta su botón: hoy están ocultos LinkedIn, Instagram y el mail (Microsoft Store, si se vacía, vuelve a decir "Próximamente"). Los precios (mensual y anual), los días de prueba y las PCs por cuenta tienen que coincidir con los del servidor (`paquetes/compartido/src/planes.ts` en el repo de Cota). La landing no muestra descuentos. Los valores se aplican al compilar, en el plugin de `vite.config.ts`. En el HTML:
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

## Política de privacidad y condiciones del servicio

- `privacidad.html` es la política de privacidad: su URL se carga en Microsoft Store (*Propiedades*) y en Google Cloud (*pantalla de consentimiento de OAuth*, para entrar con Google).
- `terminos.html` son las condiciones del servicio: su URL se carga en Google Cloud, en la misma pantalla.
- Las dos están enlazadas desde el pie de la portada y desde *Crear una cuenta* en la app (`paquetes/app/src/components/Cuenta.tsx`).
- Describen lo que hace Cota 3 de verdad: la cuenta, los proyectos en la nube, compartir, la prueba, la suscripción y qué pasa al dejar de pagar. Si eso cambia en la app o en el servidor, hay que actualizar el texto.
- Cada vez que cambie el texto, actualizar `privacidadActualizada` o `terminosActualizados` en `src/config.ts`. El email de contacto es `emailPrivacidad`.

## Descarga del instalador

El botón apunta a `https://github.com/COTA-App/Downloads/releases/latest/download/Cota-Instalador.exe`:
- `Downloads` es un repo **público** que solo tiene releases. El repo de la app es privado y sus descargas piden login.
- `npm run release`, en el repo de Cota, sube ahí una copia del instalador con ese nombre fijo, así el link siempre baja la última versión.

## Publicación

El repo es público y se publica con **GitHub Pages**, en https://cota-arq.com.
- Con cada push a `main`, `.github/workflows/publicar.yml` compila y publica sola.
- El dominio está cargado en *Settings → Pages → Custom domain*; el DNS está en Cloudflare
  (registros A/AAAA de GitHub Pages en `cota-arq.com` y CNAME `www` → `cota-app.github.io`, sin proxy).
- La página vive en la raíz (`BASE` = `/`, el default de `vite.config.ts`).

## Prácticas de Apple

`.claude/skills/` tiene las skills de Human Interface Guidelines de [raintree-technology/apple-hig-skills](https://github.com/raintree-technology/apple-hig-skills), con licencia MIT. Están ahí para que Claude las consulte al cambiar el diseño. Lo que se aplica acá:
- tipografía del sistema, y jerarquía con peso y tamaño;
- grises por transparencia;
- botones de 44 px de alto como mínimo;
- contraste AA en claro y en oscuro;
- `prefers-reduced-motion`;
- el contenido (las capturas) por encima de la decoración.
