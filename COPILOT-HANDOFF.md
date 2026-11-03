# Continuar m.cfinova — 3 noviembre 2026

## Objetivo y preferencias
Terminar la app antes de promocionarla. Trabajar con opciones gratuitas, sin contratar servicios ni publicidad. Conservar datos de usuarios y diseño morado. No declarar lista para vender sin verificar pagos, activación y cancelación. La compra única se ha solicitado como alternativa, pero su precio, alcance y duración no se han acordado; no crear una oferta arbitraria.

## Fuente
Repositorio bebesonrisas-netizen/Marcela-Cevallos, main 03d724a9b998ec957350fa6807b59562049a25ad. Sitio https://storied-pika-1d2990.netlify.app/ desplegado por Netlify desde main. Leer primero README, package.json, netlify.toml, netlify/functions y pruebas. Esta rama solo entrega contexto; no fusionar cambios de pagos sin verificarlos.

## Cambios anteriores
Guardados atómicos y validación en movimientos, préstamos y facturas; corrección de secciones ocultas del dashboard; fallback de decodificación de imágenes y descarga real de documentos al compartir. PDF implementado en assets/finova-pdf.js con PDF.js, extracción de texto y OCR de páginas escaneadas. Límites 10 MiB y cinco páginas, revisión antes de guardar. Se reportaron 53 pruebas pasando el 2 noviembre; volver a ejecutar en el entorno actual. Se verificaron PDF de texto y escaneado con datos sintéticos en el sitio. Cámara y voz no verificadas en el móvil real de la usuaria.

## Stripe real: hechos consultados
Cuenta m.cfinova acct_1UNYwe0G40NrtpeH, livemode true. Cuenta habilitada para cobros y transferencias según consulta anterior; revalidar antes del lanzamiento. Un único precio real activo comprobado: price_1UNuob0G40NrtpeHM7Dvcu6d, producto prod_VOiFQoGVto1qnq, 499 céntimos EUR por mes, lookup_key finova_premium_monthly. tax_behavior exclusive: NO asumir que impuestos están incluidos o configurados. Los otros tres precios mostrados por la app (49,99 anual Premium; 8,99 mensual Pro; 89,99 anual Pro) no estaban creados en real en la última consulta.

Portal real bpc_1UXS4J0G40NrtpeH0fxTUzr3 activo/predeterminado: historial de facturas y actualización de tarjeta habilitados; cancelación al final del período habilitada; cambio de plan deshabilitado. El netlify.toml consultado aún fija FINOVA_BILLING_MODE=test y un portal de sandbox bpc_1UTp1i0WT1XqdqLbOgaNDm1w. No cambiar solo el modo sin claves y configuración consistentes.

## Bloqueo comprobado
Las consultas del conector Stripe funcionan, pero todas las escrituras intentadas devolvieron error: Authentication for Stripe was requested and accepted. Retry this tool call now. La repetición devuelve lo mismo. No se creó webhook real: lista vacía en la última comprobación. No insistir en bucles ni confundir autorización con ejecución. El navegador remoto no comparte la sesión Safari de la usuaria; las credenciales introducidas en intentos anteriores fueron rechazadas. No hay sesión autenticada confirmada. No pedir secretos por chat ni incluirlos en repositorio/logs.

## Pendiente necesario
1. Crear y verificar webhook real en https://storied-pika-1d2990.netlify.app/.netlify/functions/stripe-webhook . Eventos esperados: checkout.session.completed, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed, customer.subscription.created, customer.subscription.updated, customer.subscription.deleted, invoice.paid, invoice.payment_failed. Comprobar compatibilidad con la API del código (2026-08-26.dahlia) antes de seleccionar versión o actualizar SDK.
2. Configurar clave restringida real y STRIPE_WEBHOOK_SECRET real de forma segura en Netlify Production, junto al portal y modo compatibles. No revelar ni sobrescribir secretos desconocidos sin la vía de acceso adecuada.
3. Resolver planes anunciados que no existen en real: crearlos con alcance acordado o limitar oferta visible al plan validado; no vender funciones no verificadas.
4. Verificar checkout, firma del webhook, activación/revalidación y cancelación al final del período, incluido rechazo de eventos/recibos inválidos. No hacer cargos reales sin autorización específica.
5. Revisar restauración de backups, idiomas, asistente, facturas y Negocios con pruebas significativas; evitar afirmar que un historial de pruebas certifica funciones no probadas.
6. Revisar información comercial, soporte y documentos públicos antes de vender; no inventar datos legales ni prometer cumplimiento fiscal.

## Promoción pausada
Cinco publicaciones de m.cfinova en Metricool (cuatro TikTok y un Reel Instagram del 3–6 noviembre) se pasaron a borrador. La automatización de anuncios diarios recibió instrucción de no programar/publicar m.cfinova ni reactivar borradores hasta nueva autorización explícita. NovaLibros y Chela son proyectos aparte; no modificarlos. No reanudar promoción automáticamente.

## Primera tarea para Copilot
Revisa el código actual, reproduce las pruebas y presenta cambios concretos para terminar pagos e identificar errores reales. Distingue código que puedes modificar de configuración externa que requiere acceso. No afirmar que tener un chat gratuito implica un agente autónomo remoto ni que resuelve permisos de Stripe/Netlify.
