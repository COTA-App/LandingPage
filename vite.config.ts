import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config.ts'

/**
 * Completa index.html con los valores de src/config.ts:
 *   {{clave}}                          se reemplaza por el valor
 *   <!-- si:clave --> … <!-- /si -->   se deja solo si el valor no está vacío
 *   <!-- no:clave --> … <!-- /no -->   se deja solo si el valor está vacío
 */
const pesos = (n: number) => n.toLocaleString('es-AR')
/** Redondeado a la centena: 299.000 / 12 → "24.900". */
const centena = (n: number) => pesos(Math.round(n / 100) * 100)

/** Los valores de cada plan para el HTML: `{{estudioMensual}}`, `{{estudioPorPersona}}`, `{{estudioPersonas}}`… */
function valoresDePlanes(): Record<string, string> {
  const { independiente, estudio, estudioPlus } = config.planes
  const valores: Record<string, string> = { independientePcs: String(independiente.pcs) }
  for (const [nombre, plan] of Object.entries({ independiente, estudio, estudioPlus })) {
    valores[`${nombre}Mensual`] = pesos(plan.mensualArs)
    valores[`${nombre}Anual`] = pesos(plan.anualArs)
  }
  for (const [nombre, plan] of Object.entries({ estudio, estudioPlus })) {
    valores[`${nombre}Personas`] = String(plan.personas)
    valores[`${nombre}PorPersona`] = centena(plan.mensualArs / plan.personas)
  }
  return valores
}

function completarConfig(): Plugin {
  const valores: Record<string, string> = {
    ...Object.fromEntries(Object.entries(config).map(([k, v]) => [k, String(v)])),
    ...valoresDePlanes(),
    // Adónde escribir para un plan a medida: el mail de contacto, o si no hay, el de privacidad.
    contacto: config.email || config.emailPrivacidad,
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
      // privacidad.html: la política de privacidad (la piden Microsoft Store y Google, para entrar con Google).
      // terminos.html: las condiciones del servicio (la pide Google, en la pantalla de consentimiento).
      input: { index: 'index.html', pago: 'pago.html', privacidad: 'privacidad.html', terminos: 'terminos.html' }
    }
  }
})
