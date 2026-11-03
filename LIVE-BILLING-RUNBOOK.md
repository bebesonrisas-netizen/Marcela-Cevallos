# Lista de verificación para cerrar el lanzamiento de m.cfinova

Esta lista separa las comprobaciones reproducibles en el repositorio de las acciones que requieren acceso a Stripe, Netlify o al operador. No habilita cobros reales ni acredita cumplimiento legal. Mantener el modo de facturación desactivado o en pruebas hasta completar y aprobar expresamente los pasos de producción.

## 1. Comprobaciones locales antes de tocar Stripe

- [ ] En un entorno limpio, ejecutar `npm ci && npm test` y guardar el resultado completo del comando.
- [ ] Revisar los fallos individualmente; los tests de cámara, dictado, OCR y pagos simulan APIs y no demuestran funcionamiento en dispositivos ni una compra real.
- [ ] Probar exportación y restauración de copias v1 y v2 con datos sintéticos. Confirmar que cancelar la restauración no cambia nada y que un fallo de almacenamiento conserva los datos anteriores.
- [ ] Probar las siete opciones de idioma en pantallas principales, informes, facturas, Negocios y mensajes de error. Registrar cadenas que sigan sólo en español.
- [ ] Probar el asistente con datos sintéticos: registrar, revisar y confirmar un movimiento; comprobar que no se duplica y que las descripciones no se envían a la función de informes.
- [ ] Probar facturas y Negocios con datos sintéticos, incluyendo importes y fechas inválidos, actualización y borrado. No tratar estas pruebas como asesoramiento ni certificación fiscal.

## 2. Cerrar primero la configuración de Stripe en pruebas

- [ ] Confirmar en el Dashboard que la cuenta y todas las credenciales seleccionadas son de pruebas; nunca introducir datos de tarjetas reales.
- [ ] Verificar que la clave restringida de pruebas tenga sólo los permisos necesarios para las llamadas que hace la integración (cuenta, clientes, precios, suscripciones, Checkout y Portal). No copiar la clave en Git, mensajes ni registros.
- [ ] Configurar en Netlify, para el contexto de despliegue correcto, `FINOVA_BILLING_MODE=test`, `STRIPE_SECRET_KEY` de pruebas, `STRIPE_WEBHOOK_SECRET` de pruebas y la configuración de portal de pruebas que corresponda. No reemplazar valores existentes sin comprobarlos.
- [ ] Crear o confirmar un endpoint de webhook para `https://storied-pika-1d2990.netlify.app/.netlify/functions/stripe-webhook`. Seleccionar los eventos implementados: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid` e `invoice.payment_failed`.
- [ ] Guardar el secreto de firma que Stripe entrega para ese endpoint únicamente en la variable segura `STRIPE_WEBHOOK_SECRET` de Netlify. Verificar que la URL de destino y el modo de Stripe coinciden.
- [ ] Desplegar y comprobar que la función pública de configuración indica el modo y disponibilidad esperados, sin exponer claves ni secretos.
- [ ] Con una cuenta de prueba confirmada, recorrer Checkout alojado, recibir el evento firmado, refrescar el estado de suscripción y cancelar desde el Portal. Confirmar que el acceso continúa hasta el fin del período cuando corresponda y que después vuelve al plan gratuito.
- [ ] Comprobar que una firma ausente o inválida se rechaza, que un evento de otro modo no cambia el estado, y que los recibos/eventos impagados no conceden Premium. Usar sólo utilidades y eventos de prueba de Stripe.

## 3. Preparación de producción — bloqueada hasta aprobación explícita

No cambiar Netlify a `live` hasta que el operador confirme por escrito el producto/precio que quiere vender, el precio y período, las funciones incluidas, el portal, los datos comerciales publicados y autorización para activar cobros. El dato de que existe un precio real activo no identifica por sí solo cuál de los cuatro planes de la aplicación representa.

- [ ] Revalidar en Stripe que la cuenta real correcta está activa y habilitada para cobros; confirmar producto, moneda, importe, recurrencia y lookup key del precio elegido. No crear ni cambiar precios sin aprobación del operador.
- [ ] Decidir explícitamente si se ofrecerá sólo el precio verificado o si se crearán los otros planes; ocultar o retirar ofertas cuyas funciones/precios no estén verificados antes de promocionarlas.
- [ ] Revalidar la configuración real de Customer Portal y sus funciones. No asumir que una configuración observada anteriormente sigue activa.
- [ ] Crear el endpoint de webhook en modo real con los eventos de la sección anterior y verificar que apunta exactamente a la URL de producción.
- [ ] Introducir `STRIPE_SECRET_KEY` restringida real, el secreto de firma real, `FINOVA_BILLING_MODE=live` y la configuración de portal real sólo mediante el gestor seguro de variables de Netlify Production. No imprimir, transmitir ni guardar los secretos en el repositorio. No sobrescribir secretos desconocidos.
- [ ] Confirmar que la aplicación rechaza las credenciales de pruebas en modo real, valida la cuenta real y el Portal real, y no confunde derechos de suscripciones de prueba con reales.
- [ ] Hacer pruebas de firma, estado y cancelación sin crear cargos reales. Una compra real requiere autorización explícita y un plan de prueba acordado por el operador; no hacerla como parte de una verificación automática.
- [ ] Publicar datos de vendedor, contacto/soporte, privacidad y términos de suscripción confirmados por el operador. Solicitar revisión profesional para obligaciones legales y fiscales; no inventar datos ni prometer cumplimiento.

## 4. Criterio de salida

La promoción y la venta siguen pausadas si falla cualquier comprobación, si quedan planes anunciados sin precio/funciones validados, si faltan secretos/configuración de producción, o si no se han confirmado los documentos y datos del vendedor. Un resultado verde de `npm test` sólo certifica los casos automatizados incluidos en el repositorio; no sustituye las verificaciones externas anteriores.
