NOMBRE: FranRental
AUTOR: Francisco J. Prieto

DESCRIPCION:
Sistema de alquiler de vehículos desarrollado con Spring Boot y React.

REQUISITOS:
~ Java 17+
~ Node.js 16+
~ npm
~ Cuenta Gmail con contraseña de aplicacion (opcional, para envio de emails)

EJECUTAR:

Backend:
cd backend
./mvnw spring-boot:run

Frontend:
cd frontend
npm install
npm start

Email (opcional):
Para que se envien emails de confirmacion de reserva, configurar variables de entorno antes de iniciar el backend:
export MAIL_USERNAME=tu_email@gmail.com
export MAIL_PASSWORD=tu_contraseña_de_aplicacion
La contraseña de aplicacion se genera en Google Account > Seguridad > Verificacion en 2 pasos > Contraseñas de aplicaciones

BROWSER: http://localhost:3000

CREDENCIALES DE PRUEBA:
~ Admin: admin@franrental.com / Admin123! (rol ADMIN)
~ Usuario: juan@example.com / password123 (rol USER)

TECNOLOGIAS:
~ Java 17
~ Spring Boot
~ React
~ H2 Database
~ Axios
~ Bootstrap (estrellas de puntuacion)

FUNCIONALIDADES:

Usuario:
~ Ver catalogo de vehiculos con paginacion
~ Buscar vehiculos por nombre o descripcion
~ Filtrar por categoria
~ Ver detalle con caracteristicas y politicas
~ Registrarse e iniciar sesion
~ Agregar vehiculos a favoritos
~ Hacer reservaciones con verificacion de login
~ Ver resumen de reserva con datos de usuario
~ Agregar comentarios a la reserva
~ Pagina de confirmacion de reserva exitosa
~ Recibir email de confirmacion de reserva
~ Ver mis reservas
~ Dejar resenias con puntuacion de estrellas
~ Compartir vehiculo (copiar link)
~ Contactar por WhatsApp

Administrador:
~ Panel de administracion
~ CRUD de vehiculos
~ CRUD de categorias
~ CRUD de caracteristicas
~ Gestionar reservaciones
~ Gestionar roles de usuarios
