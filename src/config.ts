// Todo lo que cambia con el tiempo en la página: links, precio y redes.
// Un valor vacío ('') oculta su botón o ícono. Se aplica al compilar (ver vite.config.ts):
// la página final no lleva JavaScript.

export const config = {
  /** Instalador de Windows. Nombre fijo: siempre baja la última versión publicada. */
  descargaExe: 'https://github.com/COTA-App/Downloads/releases/latest/download/Cota-Instalador.exe',
  /** Ficha de Cota en Microsoft Store. Mientras esté vacío, el botón dice "Próximamente". */
  microsoftStore: 'https://apps.microsoft.com/detail/9N9WT9VWB77D',
  /** Ficha de Cota en el App Store (iPhone y iPad). Mientras esté vacío, dice "Próximamente para iPhone y iPad". */
  appStore: '',
  /** Precios en pesos, sin puntos. Tienen que coincidir con PRECIO_MENSUAL_ARS y PRECIO_ANUAL_ARS del servidor. */
  precioMensualArs: 29900,
  precioAnualArs: 299000,
  /** Tienen que coincidir con DIAS_PRUEBA y EQUIPOS_POR_CUENTA de paquetes/compartido/src/planes.ts. */
  diasPrueba: 30,
  equiposPorCuenta: 1,
  linkedin: '',
  instagram: '',
  email: '',
  /** Contacto de la política de privacidad y de los términos (consultas y pedidos de borrado). Siempre se muestra en privacidad.html y terminos.html. */
  emailPrivacidad: 'manupuey03@gmail.com',
  /** Fecha de la última versión de la política de privacidad. Cambiarla cada vez que cambie el texto. */
  privacidadActualizada: '23 de octubre de 2026',
  /** Fecha de la última versión de las condiciones del servicio. Cambiarla cada vez que cambie el texto. */
  terminosActualizados: '23 de octubre de 2026'
}
