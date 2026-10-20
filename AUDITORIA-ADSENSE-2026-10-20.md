# Auditoría inicial AdSense — Finova (20 octubre 2026)

## Incidencia comunicada por AdSense
"Anuncios servidos por Google en pantallas sin contenido del editor": anuncios en pantallas sin contenido o con contenido de poco valor, en construcción, o dedicadas a navegación/alertas/acciones.

## Hallazgos comprobados en index.html (rama main)
- Script global AdSense retirado del HTML en commit ff8d96b4ea3c9dbd0bc1c2082385fef84d30b642. No hay bloques <ins class="adsbygoogle"> en ese archivo.
- La portada es principalmente una aplicación interactiva con menú y herramientas (movimientos, préstamos, facturas, documentos, ahorros, configuración); no equivale por sí sola a una página editorial apta para monetización con AdSense.
- No existe elemento <footer> ni enlace de contacto visible en index.html. La palabra «privacidad» aparece en un checklist de publicación, no prueba la existencia de una política de privacidad pública.
- La página principal ofrece funciones de registro de datos y acceso, pero no se ha verificado con pruebas de navegador ni se han auditado todas las rutas.
- No se ha comprobado el estado de anuncios automáticos dentro de la cuenta de AdSense, ni el despliegue de Netlify.

## Recomendaciones antes de volver a solicitar revisión
1. Mantener sin publicidad las pantallas de login, configuración, formularios, navegación, documentos privados y herramientas financieras.
2. Publicar páginas accesibles de información real y original: qué es Finova, cómo funciona, ayuda, privacidad y contacto; revisar enlaces y contenido.
3. Revisar que no haya anuncios automáticos activos para esas pantallas y que la página publicada corresponde a la versión corregida.
4. Probar la web en móvil y escritorio, enlaces, errores y funcionamiento básico.
5. Solo confirmar «He resuelto los problemas» y solicitar revisión cuando se hayan aplicado y comprobado los cambios.

Esta auditoría es preliminar y NO constituye certificación de cumplimiento ni garantía de aprobación de Google.
