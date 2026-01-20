
REQUISITOS
~ Java 17
~ Node.js 20

CLONAR PROYECTO
~ git clone git@github.com:FJPBOT/franrental.git
~ cd franrental

EJECUTAR BACKEND
~ cd backend
~ ./mvnw spring-boot:run
~ Esperar a que diga Started BackendApplication

EJECUTAR FRONTEND
~ Abrir nueva terminal
~ cd frontend
~ npm install
~ npm start
~ Se abre automaticamente en http://localhost:3000

URLS
~ Frontend: http://localhost:3000
~ Backend: http://localhost:8080
~ H2 Console: http://localhost:8080/h2-console
~ Admin: http://localhost:3000/admin

CREDENCIALES H2
~ JDBC URL: jdbc:h2:mem:franrentaldb
~ Username: admin
~ Password: (vacio)

PROBLEMAS COMUNES
A. Puerto 8080 ocupado
Cerrar otras aplicaciones que usen el puerto 8080
B. npm install falla
Borrar node_modules y package-lock.json
Ejecutar npm install nuevamente
C. Backend no arranca
Verificar que Java 17 este instalado: java -version

