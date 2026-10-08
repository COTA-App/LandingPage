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
  // En GitHub Pages la página vive en /COTA-LandingPage/; con dominio propio, en la raíz.
  // El workflow de publicación pasa la ruta en BASE.
  base: process.env.BASE ?? '/',
  plugins: [tailwindcss(), completarConfig()]
})
