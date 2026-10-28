import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config.ts'

/**
 * Completa las páginas con los valores de src/config.ts:
 *   {{clave}}                          se reemplaza por el valor
 *   <!-- si:clave --> … <!-- /si -->   se deja solo si el valor no está vacío
 *   <!-- no:clave --> … <!-- /no -->   se deja solo si el valor está vacío
 */

/** Adónde lleva "Pedí una demo": WhatsApp con el mensaje ya escrito, o si no hay número, un mail. */
function linkDemo(contacto: string): string {
  const numero = config.whatsapp.replace(/\D/g, '')
  if (numero) return `https://wa.me/${numero}?text=${encodeURIComponent(config.mensajeDemo)}`
  return `mailto:${contacto}?subject=${encodeURIComponent(config.mensajeDemo)}`
}

function completarConfig(): Plugin {
  // Adónde escribir: el mail de contacto, o si no hay, el de privacidad.
  const contacto = config.email || config.emailPrivacidad
  const valores: Record<string, string> = {
    ...Object.fromEntries(Object.entries(config).map(([k, v]) => [k, String(v)])),
    contacto,
    demo: linkDemo(contacto),
    independientePcs: String(config.planes.independiente.pcs),
    estudioPersonas: String(config.planes.estudio.personas),
    estudioPlusPersonas: String(config.planes.estudioPlus.personas),
    anio: String(new Date().getFullYear())
  }
  return {
    name: 'completar-config',
    transformIndexHtml(html) {
      return html
        .replace(/<!-- si:(\w+) -->([\s\S]*?)<!-- \/si -->/g, (_, k, bloque) => (valores[k] ? bloque : ''))
        .replace(/<!-- no:(\w+) -->([\s\S]*?)<!-- \/no -->/g, (_, k, bloque) => (valores[k] ? '' : bloque))
        .replace(/\{\{(\w+)\}\}/g, (_, k) => {
          if (!(k in valores)) throw new Error(`La página usa {{${k}}}, que no está en src/config.ts`)
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
      // descargar.html: los instaladores; no está enlazada (se manda a cada cliente, y la abre el aviso de versión nueva).
      // privacidad.html: la política de privacidad (la piden Microsoft Store y Google, para entrar con Google).
      // terminos.html: las condiciones del servicio (la pide Google, en la pantalla de consentimiento).
      input: { index: 'index.html', pago: 'pago.html', descargar: 'descargar.html', privacidad: 'privacidad.html', terminos: 'terminos.html' }
    }
  }
})
