NOMBRE: FranRental
AUTOR: Francisco J. Prieto

DESCRIPCION:
Sistema de alquiler de vehículos desarrollado con Spring Boot y React.

REQUISITOS:
~ Java 17+
~ Node.js 16+
~ npm

EJECUTAR:

Backend:
cd backend
./mvnw spring-boot:run

Frontend:
cd frontend
npm install
npm start

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
~ Hacer reservaciones
~ Ver mis reservas
~ Dejar resenias con puntuacion de estrellas
~ Compartir vehiculo (copiar link)

Administrador:
~ Panel de administracion
~ CRUD de vehiculos
~ CRUD de categorias
~ CRUD de caracteristicas
~ Gestionar reservaciones
~ Gestionar roles de usuarios
