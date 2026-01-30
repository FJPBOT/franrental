HISTORIA 1: HEADER
CRITERIO: El header debe ocupar 100% del ancho y estar fijo arriba
PRUEBA:

Abrir http://localhost:3000
Verificar que el header este en la parte superior
Hacer scroll hacia abajo
Verificar que el header siga visible

RESULTADO: Paso

HISTORIA 2: CUERPO DEL SITIO
CRITERIO: El main debe tener color de fondo y 100% de alto
PRUEBA:

Abrir http://localhost:3000
Verificar que el fondo sea gris claro
Verificar que ocupe toda la pantalla

RESULTADO: Paso

HISTORIA 3: REGISTRAR PRODUCTO
CRITERIO: Poder agregar vehiculos y que aparezcan en el listado
PRUEBA:

Ir a http://localhost:3000/admin/add
Llenar formulario con:
Nombre: Test Vehicle
Descripcion: Test description
Categoria: Sedan
Click en Guardar
Ir a /admin/list
Verificar que aparece el vehiculo nuevo

RESULTADO: Paso
PRUEBA DE VALIDACION:

Intentar crear vehiculo con nombre duplicado
Verificar que muestra error Vehicle name already exists

RESULTADO: Paso

HISTORIA 4: VISUALIZAR PRODUCTOS EN HOME
CRITERIO: Mostrar maximo 10 vehiculos aleatorios en 2 columnas
PRUEBA:

Abrir http://localhost:3000
Contar vehiculos mostrados (deben ser 10)
Verificar que esten en 2 columnas
Recargar pagina
Verificar que el orden cambio (son aleatorios)

RESULTADO: Paso

HISTORIA 5: DETALLE DEL PRODUCTO
CRITERIO: Ver datos basicos del vehiculo
PRUEBA:

En el home hacer click en un vehiculo
Verificar que muestra:
Nombre del vehiculo
Descripcion completa
Categoria
Imagen
Boton volver

RESULTADO: Paso

HISTORIA 6: GALERIA DE IMAGENES
CRITERIO: Mostrar imagen del vehiculo
PRUEBA:

Abrir detalle de un vehiculo
Verificar que la imagen ocupa todo el ancho
Verificar que se ve completa

RESULTADO: Paso
NOTA: Solo se implemento 1 imagen en lugar de galeria de 5 imagenes

HISTORIA 7: FOOTER
CRITERIO: Footer que ocupe 100% del ancho con isologotipo y copyright
PRUEBA:

Abrir cualquier pagina
Hacer scroll hasta abajo
Verificar que el footer tiene:
Isologotipo FR
Copyright con año actual

RESULTADO: Paso

HISTORIA 8: PAGINACION
CRITERIO: Resultados limitados a 10 por pagina
PRUEBA:

Abrir http://localhost:3000
Verificar que muestra maximo 10 vehiculos
Verificar botones de paginacion abajo
Click en siguiente pagina
Verificar que cambian los vehiculos

RESULTADO: Paso

HISTORIA 9: PANEL DE ADMINISTRACION
CRITERIO: URL /administracion con menu de funciones
PRUEBA:

Ir a http://localhost:3000/admin
Verificar que muestra 2 opciones:
Agregar Vehiculo
Lista de Vehiculos
Abrir desde celular o reducir ventana
Verificar mensaje no disponible en moviles

RESULTADO: Paso

HISTORIA 10: LISTAR PRODUCTOS
CRITERIO: Tabla con columnas ID Nombre Acciones
PRUEBA:

Ir a http://localhost:3000/admin/list
Verificar tabla con columnas:
ID
Nombre
Categoria
Acciones

RESULTADO: Paso
NOTA: Se agrego columna Categoria adicional

HISTORIA 11: ELIMINAR PRODUCTO
CRITERIO: Eliminar con confirmacion
PRUEBA:

En /admin/list hacer click en Eliminar
Verificar que aparece modal de confirmacion
Click en Cancelar y verificar que no se elimina
Click en Eliminar otra vez
Click en Eliminar del modal
Verificar que desaparece de la lista

RESULTADO: Paso

RESUMEN
Total de historias: 11
Pasaron: 11
Fallaron: 0

SPRINT 2

HISTORIA 12: ASIGNAR CATEGORIAS
CRITERIO: Asignar categoria a vehiculo desde panel admin
PRUEBA:
Ir a /admin/categories
Crear categoria "SUV Premium"
Ir a /admin/add
Crear vehiculo seleccionando la categoria
Ir a detalle del vehiculo
Verificar que muestra la categoria
RESULTADO: Paso

HISTORIA 13: REGISTRAR USUARIO
CRITERIO: Usuario anonimo puede registrarse
PRUEBA:
Ir a /register
Llenar formulario:
Nombre: Juan
Apellido: Perez
Email: juan@test.com
Contraseña: 123456
Click en Crear Cuenta
Verificar que aparece avatar con iniciales JP
RESULTADO: Paso

PRUEBA DE VALIDACION:
Intentar registrarse con email duplicado
Verificar mensaje "El email ya esta registrado"
RESULTADO: Paso

HISTORIA 14: IDENTIFICAR USUARIO
CRITERIO: Usuario puede iniciar sesion
PRUEBA:
Cerrar sesion si esta logueado
Ir a /login
Ingresar email y contraseña
Click en Iniciar Sesion
Verificar que aparece avatar con iniciales
RESULTADO: Paso

PRUEBA DE VALIDACION:
Intentar login con contraseña incorrecta
Verificar mensaje "Email o contraseña incorrectos"
RESULTADO: Paso

HISTORIA 15: CERRAR SESION
CRITERIO: Usuario puede cerrar sesion
PRUEBA:
Estar logueado
Click en avatar
Verificar menu con nombre, email y rol
Click en "Cerrar Sesion"
Verificar que vuelven botones "Crear cuenta" e "Iniciar sesion"
RESULTADO: Paso

HISTORIA 16: IDENTIFICAR ADMINISTRADOR
CRITERIO: Asignar rol admin a usuario
PRUEBA:
Ir a /admin/users
Verificar lista de usuarios con rol actual
Click en "Hacer Admin" en un usuario USER
Verificar que cambia a ADMIN
Click en "Quitar Admin"
Verificar que vuelve a USER
RESULTADO: Paso

HISTORIA 17: ADMINISTRAR CARACTERISTICAS
CRITERIO: CRUD de caracteristicas desde panel admin
PRUEBA:
Ir a /admin/features
Click "Agregar Nueva Caracteristica"
Nombre: Air Conditioning
URL icono: https://ejemplo.com/icon.png
Click Crear
Verificar que aparece en lista
Editar y eliminar
RESULTADO: Paso

HISTORIA 18: VISUALIZAR CARACTERISTICAS
CRITERIO: Ver caracteristicas en detalle de vehiculo
PRUEBA:
Crear vehiculo con caracteristicas
Ir al detalle del vehiculo
Verificar seccion "Caracteristicas"
Verificar que muestra nombre e icono
RESULTADO: Paso

HISTORIA 19: CREAR SECCION CATEGORIAS (FILTRADO)
CRITERIO: Filtrar vehiculos por categoria en el home
PRUEBA:
Abrir http://localhost:3000
Verificar dropdown de categorias
Seleccionar una categoria (ej: SUV)
Verificar que solo muestra vehiculos de esa categoria
Verificar contador de vehiculos por categoria
Click en "Todas las categorias"
Verificar que vuelve a mostrar todos
RESULTADO: Paso

HISTORIA 20: AGREGAR CATEGORIAS
CRITERIO: CRUD de categorias desde panel admin
PRUEBA:
Ir a /admin/categories
Click "Agregar Nueva Categoria"
Titulo: SUV Premium
Descripcion: Vehiculos deportivos utilitarios de lujo
Click Crear
Verificar lista con contador de vehiculos
Editar y eliminar
RESULTADO: Paso

RESUMEN SPRINT 2
Total historias: 9
Implementadas: 9
Pasaron: 9
Fallaron: 0

RESUMEN TOTAL
Sprint 1: 11/11
Sprint 2: 9/9

SPRINT 3

HISTORIA 22: BUSQUEDA DE PRODUCTOS
CRITERIO: Buscar vehiculos por nombre o descripcion
PRUEBA:
Abrir http://localhost:3000
Escribir "Toyota" en el buscador
Verificar que filtra y muestra solo vehiculos con Toyota
Borrar busqueda con boton X
Verificar que vuelven todos los vehiculos
RESULTADO: Paso
NOTA: No se implemento calendario doble ni autocompletado de sugerencias

HISTORIA 23: VISUALIZAR DISPONIBILIDAD
CRITERIO: Ver fechas disponibles del vehiculo
PRUEBA:
Ir a detalle de un vehiculo
Click en "Reservar Ahora"
Verificar calendario con fechas
Verificar que fechas ocupadas estan bloqueadas
RESULTADO: Paso
NOTA: El calendario esta en la pagina de reserva, no en el detalle del vehiculo

HISTORIA 24: MARCAR COMO FAVORITO
CRITERIO: Usuario puede agregar vehiculos a favoritos
PRUEBA:
Iniciar sesion
En el home ver boton de corazon en cada vehiculo
Click en corazon blanco
Verificar que cambia a corazon rojo
Recargar pagina
Verificar que sigue en rojo
RESULTADO: Paso


HISTORIA 25: LISTA DE FAVORITOS
CRITERIO: Ver todos los vehiculos favoritos
PRUEBA:
Agregar 3 vehiculos a favoritos
Click en boton "Favoritos" del header
Verificar que muestra los 3 vehiculos
Click en corazon rojo para quitar uno
Verificar que desaparece de la lista
RESULTADO: Paso

HISTORIA 26: BLOQUE DE POLITICAS
CRITERIO: Ver politicas en detalle de vehiculo
PRUEBA:
Entrar a detalle de cualquier vehiculo
Scroll hacia abajo
Verificar seccion "Politicas del Vehiculo"
Verificar 4 bloques:
- Que incluye
- Que no incluye
- Requisitos
- Cancelacion
RESULTADO: Paso

HISTORIA 27: COMPARTIR EN REDES
CRITERIO: Compartir vehiculo
PRUEBA:
Entrar a detalle de vehiculo
Click en boton "Compartir"
Verificar alert "Link copiado al portapapeles"
Pegar en otra ventana (Cmd+V)
Verificar que es la URL del vehiculo
RESULTADO: Paso
NOTA: No se integro con redes sociales, solo copia URL

HISTORIA 28: PUNTUAR PRODUCTO
CRITERIO: Dejar reseña con estrellas
PRUEBA:
Iniciar sesion
Entrar a detalle de vehiculo
Scroll a seccion "Reseñas"
Click en estrellas para dar puntuacion
Escribir comentario
Click "Enviar Reseña"
Verificar que aparece en la lista
Verificar que se actualiza el promedio arriba
RESULTADO: Paso

HISTORIA 29: ELIMINAR CATEGORIAS
CRITERIO: Ya implementado en Sprint 2
RESULTADO: Paso (ver Sprint 2)

RESUMEN SPRINT 3
Total historias: 8
Implementadas: 8
Pasaron: 8
Fallaron: 0

RESUMEN TOTAL
Sprint 1: 11/11
Sprint 2: 9/9
Sprint 3: 8/8
Total: 28/28 historias completadas
