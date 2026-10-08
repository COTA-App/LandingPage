// Todo lo que cambia con el tiempo en la página: links, precio y redes.
// Un valor vacío ('') oculta su botón o ícono. Se aplica al compilar (ver vite.config.ts):
// la página final no lleva JavaScript.

export const config = {
  /** Instalador de Windows. Nombre fijo: siempre baja la última versión publicada. */
  descargaExe: 'https://github.com/COTA-App/Downloads/releases/latest/download/Cota-Instalador.exe',
  /** Ficha de Cota en Microsoft Store. Mientras esté vacío, el botón dice "Próximamente". */
  microsoftStore: '',
  /** Ficha de Cota en el App Store (iPhone y iPad). Mientras esté vacío, dice "Próximamente para iPhone y iPad". */
  appStore: '',
  /** Precios en pesos, sin puntos. Tienen que coincidir con PRECIO_MENSUAL_ARS y PRECIO_ANUAL_ARS del servidor. */
  precioMensualArs: 50000,
  precioAnualArs: 500000,
  diasPrueba: 14,
  equiposPorLicencia: 3,
  linkedin: '',
  instagram: '',
  email: ''
}
