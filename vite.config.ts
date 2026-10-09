import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config.ts'

/**
 * Completa index.html con los valores de src/config.ts:
 *   {{clave}}                          se reemplaza por el valor
 *   <!-- si:clave --> … <!-- /si -->   se deja solo si el valor no está vacío
 *   <!-- no:clave --> … <!-- /no -->   se deja solo si el valor está vacío
 */
function completarConfig(): Plugin {
  const valores: Record<string, string> = {
    ...Object.fromEntries(Object.entries(config).map(([k, v]) => [k, String(v)])),
    precioMensual: config.precioMensualArs.toLocaleString('es-AR'),
    precioAnual: config.precioAnualArs.toLocaleString('es-AR'),
    // El anual cuesta como 10 meses: "2 meses gratis". Vacío si no ahorra nada.
    mesesGratis: String(Math.max(0, Math.round(12 - config.precioAnualArs / config.precioMensualArs)) || ''),
    anio: String(new Date().getFullYear())
  }
  return {
    name: 'completar-config',
    transformIndexHtml(html) {
      return html
        .replace(/<!-- si:(\w+) -->([\s\S]*?)<!-- \/si -->/g, (_, k, bloque) => (valores[k] ? bloque : ''))
        .replace(/<!-- no:(\w+) -->([\s\S]*?)<!-- \/no -->/g, (_, k, bloque) => (valores[k] ? '' : bloque))
        .replace(/\{\{(\w+)\}\}/g, (_, k) => {
          if (!(k in valores)) throw new Error(`index.html usa {{${k}}}, que no está en src/config.ts`)
          return valores[k]
        })
    }
  }
}

export default defineConfig({
  // En GitHub Pages la página vive en /LandingPage/; con dominio propio, en la raíz.
  // El workflow de publicación pasa la ruta en BASE.
  base: process.env.BASE ?? '/',
  plugins: [tailwindcss(), completarConfig()],
  build: {
    rollupOptions: {
      // pago.html: adonde vuelve Mercado Pago después de pagar (abre Cota con cota://pago).
      // privacidad.html: la política de privacidad (la pide Microsoft Store).
      input: { index: 'index.html', pago: 'pago.html', privacidad: 'privacidad.html' }
    }
  }
})
