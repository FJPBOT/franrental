BITACORA

DEFINICION
Sistema web para alquiler y gestion de vehiculos

SOLUCION

La aplicacion tiene dos partes:
Backend: API REST hecha con Spring Boot que maneja los vehiculos en una base de datos H2
Frontend: Interfaz web hecha con React que consume la API

DECISIONES TECNICAS

A.Backend
~ Spring Boot porque es el framework aprendido en el curso
~ H2 Database porque es simple y no necesita instalacion, se agrego un archivo de config donde guardo modelos a modo de ejemplo (las fotos no coinciden con los modelos).
~ DTOs para separar las entidades de las respuestas
~ ResponseStatusException para maneja errores

B.FRontend
~ React porque es el framework aprendido en el curso y uno de los mas usados a nivel profesional
~ CSS para los estilos
~ Axios para llamar al backend
~ Routing manual con window.location

C.Documentacion
~ Nano UW PICO 5.09


FUNCIONALIDADES
~ Ver lista de vehiculos en el home
~ Ver detalle de un vehiculo
~ Panel de administracion
~ Agregar vehiculo nuevo
~ Editar vehiculo
~ Eliminar vehiculo
~ Validaciones de formularios
~ Registro e inicio de sesion de usuarios
~ Sistema de roles (USER y ADMIN)
~ Avatar con iniciales en el header
~ CRUD de categorias
~ CRUD de caracteristicas
~ Asignar categoria a vehiculos
~ Asignar caracteristicas a vehiculos
~ Ver caracteristicas en detalle de vehiculo
~ Buscador de vehiculos por nombre
~ Filtrar vehiculos por categoria
~ Paginacion de resultados (10 por pagina)
~ Sistema de reservaciones
~ Pagina de mis reservas
~ Panel admin para gestionar reservas
~ Administrar roles de usuarios

PROBLEMAS ENCONTRADOS
~ Al principio tuve problemas con CORS entre React y Spring Boot. Lo solucione con @CrossOrigin.
~ No sabia como hacer el routing en React sin librerías. Use window.location.pathname.
~ Si bien especialice mi educacion en la parte del backend porque es lo que me interesaria como carrera profesional a desarrollarme y no necesite ayuda, me ayude mucho con CLAUDE para resolver mis problemas en el frontend, que ademas por haberlos visto a principio del curso, muchas cosas si las sabia hacer pero pasado el tiempo no las tenia tan frescas como el back, espacio al que le dedico varias horas de practica por dia.
~ En el Sprint 2 tuve problemas cuando agregue la entidad Category porque Vehicle tenia category como String. Tuve que cambiar Vehicle para que category sea un objeto Category con @ManyToOne
~ Cuando agregue el campo features a Vehicle se rompio el DataInitializer porque el constructor habia cambiado. Hice un metodo helper createVehicle() para solucionarlo
~ Tuve un warning de mayusculas y minusculas en macOS con authService.js. Lo solucione borrando el cache de node_modules
~ Encontre un problema con mis carpetas subidar a mi repositorio se encontraban vacias, sin estar en /.gitignore ni estar como un /.git aparte, lo solucione configurando de cero mi git principal


TIEMPO INVERTIDO
~ Backend Sprint 1: 2 dias de trabajo  (10 horas)
~ Frontend Sprint 1: una semana laboral y con mucha ayuda y distracciones (24 horas)
~ Backend Sprint 2: 8 horas
~ Frontend Sprint 2: 8 horas (usando herramientas de IA en algunos casos)
~ Total: 50 horas

SPRINT 3

NUEVAS FUNCIONALIDADES

A. Favoritos
~ Boton de corazon en cada vehiculo
~ Agregar y quitar de favoritos
~ Pagina de favoritos con todos los vehiculos guardados

B. Reseñas y Puntuaciones
~ Sistema de puntuacion de 1 a 5 estrellas
~ Dejar comentarios en vehiculos
~ Ver promedio de puntuacion
~ Contador de reseñas

C. Politicas del Vehiculo
~ Seccion de politicas en detalle
~ Que incluye el alquiler
~ Que no incluye
~ Requisitos para alquilar
~ Politicas de cancelacion

D. Compartir
~ Boton para compartir vehiculo
~ Copia URL al portapapeles

E. Reservaciones
~ Calendario para seleccionar fechas
~ Fechas ocupadas bloqueadas
~ Calculo automatico de precio
~ Pagina mis reservas para ver historial
~ Panel admin para gestionar todas las reservas

F. Busqueda y Filtros
~ Buscador por nombre y descripcion
~ Filtro por categoria con contador de vehiculos
~ Paginacion de 10 vehiculos por pagina

G. Administracion de Usuarios
~ Listado de usuarios registrados
~ Cambiar rol de USER a ADMIN y viceversa

DECISIONES TECNICAS

A. Backend
~ Entidad Favorite con relacion User-Vehicle
~ FavoriteRepository con metodo deleteByUserIdAndVehicleId
~ Entidad Reservation con validacion de fechas y conflictos
~ Entidad Review con rating de 1 a 5
~ Precio fijo de $50 USD por dia de alquiler

B. Frontend
~ Politicas hardcodeadas en el frontend (no en BD)
~ react-datepicker para el calendario de reservas
~ Paginacion en el home con botones de navegacion

PROBLEMAS ENCONTRADOS

~ Tuve que hacer publico el metodo toResponseDTO en VehicleService para que FavoriteService lo use
~ No implemente el calendario ni la integracion real con redes

TIEMPO INVERTIDO

~ Backend Sprint 3: 7 horas
~ Frontend Sprint 3: 12 horas
~ Integracion y pruebas: 5 horas
~ Total Sprint 3: 24 horas
~ Total proyecto: 82 horas

SPRINT 4

NUEVAS FUNCIONALIDADES

A. Mejoras en Reservacion
~ Verificacion de login antes de permitir reservar
~ Redireccion a login con mensaje informativo si no esta logueado
~ Muestra datos del usuario en el formulario de reserva (nombre, email)
~ Campo de comentarios opcional para la reserva
~ Pagina de confirmacion de exito con resumen completo

B. Contacto por WhatsApp
~ Boton de WhatsApp en detalle del vehiculo
~ Abre WhatsApp con mensaje pre-armado
~ Incluye nombre del vehiculo y link de la pagina

C. Notificacion por Email
~ Envio automatico de email al confirmar reserva
~ Email incluye detalles: vehiculo, fechas, precio total
~ Envio asincrono para no bloquear la respuesta

DECISIONES TECNICAS

A. Backend
~ Spring Boot Starter Mail para envio de emails
~ @Async para envio asincrono de emails
~ Variables de entorno para credenciales de email (MAIL_USERNAME, MAIL_PASSWORD)
~ Configuracion SMTP para Gmail con TLS

B. Frontend
~ Uso de useLocation para recibir mensajes de redireccion
~ Estado reservationSuccess para mostrar pagina de confirmacion
~ window.open con URL de WhatsApp API

PROBLEMAS ENCONTRADOS

~ Para enviar emails reales se necesita una cuenta Gmail con contraseña de aplicacion
~ Si no se configuran las variables de entorno, el email no se envia pero la reserva funciona igual

TIEMPO INVERTIDO

~ Backend Sprint 4: 3 horas
~ Frontend Sprint 4: 4 horas
~ Total Sprint 4: 7 horas
~ Total proyecto: 89 horas

CORRECCIONES POST-FEEDBACK SPRINT 3

A. Seguridad Backend (JWT)
~ Implementacion de autenticacion con JSON Web Tokens (JWT)
~ Filtro JwtAuthenticationFilter para validar tokens en cada request
~ Proteccion de endpoints por roles (ADMIN para operaciones de escritura)
~ Token generado en login y registro, enviado al frontend
~ Dependencias jjwt agregadas al proyecto

B. Manejo Centralizado de Excepciones
~ GlobalExceptionHandler con @RestControllerAdvice
~ Manejo de ResponseStatusException, validaciones y errores genericos
~ Respuestas de error estandarizadas con timestamp, status y mensaje

C. Correcciones de Bugs
~ Fix desfasaje de fechas en reservas (timezone UTC vs local)
~ Campo comentarios ahora se persiste en la base de datos
~ Boton WhatsApp solo visible para usuarios autenticados

D. Frontend
~ Interceptor de Axios para enviar token automaticamente en headers
~ AuthContext guarda token ademas de datos de usuario
~ Todos los servicios migrados a usar el interceptor centralizado

DECISIONES TECNICAS

~ JWT con expiracion de 24 horas
~ Secret key de 256 bits para firma HMAC
~ Rutas publicas: GET de vehiculos, categorias, features, reviews
~ Rutas protegidas (USER): reservas, favoritos, reviews POST
~ Rutas protegidas (ADMIN): CRUD completo, gestion de usuarios

TIEMPO INVERTIDO

~ Correcciones post-feedback: 4 horas
~ Total proyecto: 93 horas
