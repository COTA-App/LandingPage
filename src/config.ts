// Todo lo que cambia con el tiempo en la página: links, contacto y redes.
// Un valor vacío ('') oculta su botón o ícono. Se aplica al compilar (ver vite.config.ts):
// la página final no lleva JavaScript (salvo el desvío de #descargar, ver index.html).

export const config = {
  /**
   * WhatsApp para pedir una demo: el número con código de país y sin espacios ni signos (por ejemplo
   * 5491122334455). Vacío: el botón "Pedí una demo" abre un mail a `contacto`.
   */
  whatsapp: '5491160113268',
  /** Lo que ya viene escrito en el WhatsApp (o en el asunto del mail) al pedir una demo. */
  mensajeDemo: 'Hola, quiero ver una demo de Cota para mi estudio.',
  /**
   * La landing no ofrece descargas: Cota se vende de a uno, con una demo. Los botones de descarga
   * están en descargar.html, que no está enlazada: se le manda a cada cliente (y la abre el aviso
   * de versión nueva de la app).
   */
  /** Instalador de Windows. Nombre fijo: siempre baja la última versión publicada. */
  descargaExe: 'https://github.com/COTA-App/Downloads/releases/latest/download/Cota-Instalador.exe',
  /** Ficha de Cota en Microsoft Store. Mientras esté vacío, el botón dice "Próximamente". */
  microsoftStore: 'https://apps.microsoft.com/detail/9N9WT9VWB77D',
  /**
   * Cómo es cada plan, para las condiciones del servicio (los precios no se publican: se acuerdan con
   * cada estudio). Tienen que coincidir con NIVELES de paquetes/compartido/src/planes.ts.
   */
  planes: {
    /** Una cuenta en hasta `pcs` PCs a la vez. */
    independiente: { pcs: 2 },
    /** Hasta `personas` cuentas: quien paga y su equipo, que se suma con un código. */
    estudio: { personas: 5 },
    estudioPlus: { personas: 15 }
  },
  /** Tiene que coincidir con DIAS_PRUEBA de paquetes/compartido/src/planes.ts. */
  diasPrueba: 30,
  linkedin: '',
  instagram: '',
  email: '',
  /** Contacto de la política de privacidad y de los términos (consultas y pedidos de borrado). Siempre se muestra en privacidad.html y terminos.html. */
  emailPrivacidad: 'manupuey03@gmail.com',
  /** Fecha de la última versión de la política de privacidad. Cambiarla cada vez que cambie el texto. */
  privacidadActualizada: '28 de octubre de 2026',
  /** Fecha de la última versión de las condiciones del servicio. Cambiarla cada vez que cambie el texto. */
  terminosActualizados: '28 de octubre de 2026'
}
