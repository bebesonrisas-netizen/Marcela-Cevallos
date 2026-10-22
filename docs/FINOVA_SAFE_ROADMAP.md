# Finova AI — Plan de implementación seguro

Fecha: 2026-10-21
Rama de desarrollo: `feature/finova-safe-foundations-20261021`. No publicar en producción sin revisión.

## Auditoría inicial
- Interfaz principal monolítica en `index.html` (~90 KB), con CSS y JavaScript embebidos.
- Modalidades Personal y Negocios y panel violeta presentes; conservar apariencia aprobada.
- Stripe Checkout existe, pero el webhook solamente registra eventos: **no concede ni revoca derechos Premium**.
- El retorno `checkout=success` no acredita por sí mismo una suscripción.
- Los datos financieros locales no se sincronizan automáticamente entre dispositivos; hay que añadir exportación/restauración verificadas antes de migrar almacenamiento.
- Revisar autenticación Netlify Identity, permisos, separación de usuarios, cabeceras de seguridad y protección frente a inyección antes de lanzar a clientes.

## Fases de trabajo
1. **Fundamentos:** pruebas, copias exportables/importables con validación y versión de esquema; inventario de almacenamiento; accesibilidad y preservación de datos.
2. **Finova Personal:** panel de ingresos/gastos, presupuestos, previsiones y alertas con cálculos comprobables.
3. **Documentos:** captura de cámara y carga de archivos; extracción opcional en backend; confirmación humana antes de contabilizar; límites de tamaño y formato.
4. **Voz y asistente:** transcripción con consentimiento, borradores de movimientos y confirmación previa; no enviar documentos financieros a servicios externos sin autorización.
5. **Negocios:** clientes, proveedores, ventas y facturas numeradas; adaptar impuestos y requisitos legales por país.
6. **Idiomas:** es, en, sv, fr, de, it, pt, incluyendo mensajes de error, importes, fechas y accesibilidad.
7. **PWA y QR:** verificar manifest, iconos, instalación, permisos de cámara y funcionamiento offline seguro.
8. **Premium:** validar pagos y webhooks firmados en servidor, almacenar estado de suscripción, comprobar autorización en backend y manejar cancelaciones, reintentos e idempotencia.

## Criterios de publicación
- No sobrescribir `main` directamente; revisión mediante pull request.
- Probar alta de gasto, edición, documentos, cambio de modalidad, idiomas, respaldo/restauración, móvil y Stripe en modo de pruebas.
- No introducir claves API ni datos reales en GitHub o código cliente.
- No declarar funciones IA/OCR/sincronización como disponibles hasta que estén implementadas y verificadas.
