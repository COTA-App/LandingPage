// Página de vuelta de Mercado Pago: muestra cómo salió el pago y abre Cota.
//
// Mercado Pago agrega a la URL:
//   pago único (plan anual):  ?collection_status=approved|pending|in_process|rejected|null …
//   suscripción (mensual):    ?preapproval_id=…   (solo vuelve así si se confirmó)
// Lo que diga la URL es solo para el mensaje: la licencia se activa por lo que el servidor le
// pregunta a Mercado Pago, nunca por esta página.

const q = new URLSearchParams(location.search)
const status = q.get('collection_status') ?? q.get('status')

const estado =
  status === 'approved' || (!status && q.has('preapproval_id'))
    ? 'aprobado'
    : status === 'pending' || status === 'in_process'
      ? 'pendiente'
      : status === 'rejected' || status === 'cancelled' || status === 'null'
        ? 'rechazado'
        : 'volver'

for (const s of document.querySelectorAll<HTMLElement>('[data-estado]')) s.hidden = s.dataset.estado !== estado

// Con el pago aprobado, abrir Cota sin esperar el clic: el navegador pregunta antes de hacerlo.
if (estado === 'aprobado') setTimeout(() => (location.href = 'cota://pago'), 600)
