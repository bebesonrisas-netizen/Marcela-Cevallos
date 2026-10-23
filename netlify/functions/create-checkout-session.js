// Sales remain closed until fulfillment and cancellation pass end-to-end tests.
exports.handler = async event => ({
  statusCode: event.httpMethod === 'POST' ? 503 : 405,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify({ error: event.httpMethod === 'POST'
    ? 'Las suscripciones están en preparación. Puedes seguir usando Finova gratis.'
    : 'Método no permitido.' })
});
