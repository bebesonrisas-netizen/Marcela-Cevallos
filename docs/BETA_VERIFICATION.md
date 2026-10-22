# Finova beta — estado verificable

Última revisión: 2026-10-21

## Implementado en rama de pruebas
- Panel morado original conservado.
- Copia local JSON personal + negocios y restauración con confirmación.
- Captura de foto de recibo, con adjunto a Documentos (sin OCR automático).
- Dictado de gasto con confirmación, cuando el navegador lo admite.
- Previsión mensual local, basada en movimientos registrados.
- Borrador descargable de factura (no válido fiscalmente sin revisión).
- QR con URL estable.
- Asistente local basado en reglas, ya existente.
- Selector de siete idiomas para textos parciales, ya existente.
- Manifest PWA básico, ya existente.
- Stripe Checkout existente; **sin autorización segura de Premium** hasta implementar almacenamiento de derechos y webhooks.

## Comprobación realizada
- Se analizaron los cuatro bloques script inline de index.html con el parser JavaScript (new Function); todos pasaron tras corregir un error de comillas introducido durante el desarrollo.

## No probado ni listo para producción
- Flujos de navegador, dispositivos móviles, permisos de cámara/micrófono y recuperación de datos.
- OCR, IA generativa, traducción completa, facturación fiscal y control seguro de suscripciones.
- Netlify Deploy Preview no confirmado.

**No fusionar a main ni publicar hasta probar los flujos y resolver los puntos pendientes.**
