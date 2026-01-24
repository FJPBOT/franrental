BITACORA

DEFINICION
Sistema web para alquiler y gestion de vehiculos

SOLUCION

La aplicacion tiene dos partes:
Backend: API REST hecha con Spring Boot que maneja los vehiculos en una base de datos H2Frontend: Interfaz web hecha con React que consume la API

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

