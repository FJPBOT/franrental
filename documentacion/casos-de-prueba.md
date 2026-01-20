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

Backend tiene endpoint /api/vehicles/paginated
Probar: http://localhost:8080/api/vehicles/paginated?page=0&size=10

RESULTADO: Implementado en backend
NOTA: No se uso en el frontend porque con los 30 vehiculos de ejemplo no hacia falta

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

