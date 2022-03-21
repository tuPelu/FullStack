

[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/feliphegomez/api-rest-php.svg)](http://isitmaintained.com/project/feliphegomez/api-rest-php "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/feliphegomez/api-rest-php.svg)](http://isitmaintained.com/project/feliphegomez/api-rest-php "Percentage of issues still open")
[![Build Status](https://travis-ci.org/feliphegomez/api-rest-php.svg?branch=master)](https://travis-ci.org/feliphegomez/api-rest-php)

# API Rest en PHP
Este es un Script PHP de archivo único que agrega una API REST a una base de datos MySQL 5.5 InnoDB. PostgreSQL 9.1 y/o MS SQL Server 2012 son totalmente compatibles. Incluso hay soporte limitado para SQLite 3.

Próximamente:

  - [PHP-API-AUTH](#): Compatibilidad de complemento de autenticación JWT o nombre de usuario / contraseña.
  - [PHP-SP-API](#): Script PHP de archivo único que agrega una API REST a una base de datos SQL.
  - [PHP-CRUD-UI](#): Script PHP de archivo único que agrega una interfaz de usuario a un proyecto api-rest-php.
  - [VUE-CRUD-UI](#): Script de archivo único Vue.js que agrega una interfaz de usuario a un proyecto api-rest-php.

## Requisito
  - PHP 5.3 o superior con MySQLi, libpq, SQLSRV o SQLite3 habilitado (se recomienda PHP 7)
  - PHP en Windows (Cuando se conecta a SQL Server 2012)
  - MySQL 5.6 / MariaDB 10.0 o superior para las características espaciales en MySQL
  - PostGIS 2.0 o superior para funciones espaciales en PostgreSQL 9.1 o superior

## Instalación de la API
 Cargue el archivo "api.php" y ".htaccess" en algún lugar, configure la base de datos (Line: 2712) y disfrute!.

## Limitaciones de la API
  - Las claves primarias deben ser de autoincremento (de 1 a 2 ^ 53) o UUID.
  - Los nombres de las columnas deben ser estrictamente alfanuméricos, se permiten guiones / guiones bajos.
  - Las claves compuestas primarias o externas no son compatibles.
  - Los filtros complejos (con ambos "y" y "o") no son compatibles.
  - Las escrituras complejas (transacciones) no son compatibles.
  - Las consultas complejas que llaman funciones (como "concat" o "suma") no son compatibles.
  - El motor de almacenamiento MySQL debe ser InnoDB o XtraDB.
  - SQLite no es compatible con la funcionalidad binaria y espacial / GIS.
  - El tipo de campo BIT MySQL no es compatible (use TINYINT).

## Caracteristicas
  - Archivo PHP único, fácil de implementar.
  - Muy poco código, fácil de adaptar y mantener
  - Transmisión de datos, baja huella de memoria
  - Admite variables POST como entrada
  - Admite un objeto JSON como entrada
  - Admite una matriz JSON como entrada (inserción por lotes)
  - Admite la carga de archivos desde formularios web (multipart / form-data)
  - Salida JSON condensada: la primera fila contiene nombres de campo
  - Sanitize y valida input usando callbacks
  - Sistema de permisos para bases de datos, tablas, columnas y registros
  - Se admiten diseños de bases de datos multi-tenant
  - Soporte CORS multidominio para solicitudes entre dominios
  - Solicitudes combinadas con soporte para múltiples nombres de tabla
  - Soporte de búsqueda en múltiples criterios
  - Paginación, clasificación y selección de columna
  - Detección de relaciones y filtrado en claves externas
  - Relación "transforma" para PHP y JavaScript
  - Soporte de incremento atómico a través de PATCH (para contadores)
  - Campos binarios admitidos con codificación base64
  - Campos y filtros espaciales / GIS compatibles con WKT
  - Soporte de datos no estructurados a través de JSON / JSONB / XML
  - Generar documentación API utilizando herramientas Swagger
  - Autenticación mediante token JWT o nombre de usuario / contraseña (a través de [PHP-API-AUTH] (https://github.com/feliphegomez/php-api-auth))

## Configuration de la API
Edite las siguientes líneas en la parte inferior del archivo "api.php":
``` PHP
$api = new PHP_CRUD_API(array(
	'username'=>'xxx',
	'password'=>'xxx',
	'database'=>'xxx',
));
$api->executeCommand();
```
Estas son todas las opciones de configuración y sus valores predeterminados:
``` PHP
$api = new PHP_CRUD_API(array(
	'dbengine'=>'MySQL',
	'username'=>'root',
	'password'=>null,
	'database'=>false,
// for connectivity (defaults to localhost):
	'hostname'=>null,
	'port'=>null,
	'socket'=>null,
	'charset'=>'utf8',
// callbacks with their default behavior
	'table_authorizer'=>function($cmd,$db,$tab) { return true; },
	'record_filter'=>function($cmd,$db,$tab) { return false; },
	'column_authorizer'=>function($cmd,$db,$tab,$col) { return true; },
	'tenancy_function'=>function($cmd,$db,$tab,$col) { return null; },
	'input_sanitizer'=>function($cmd,$db,$tab,$col,$typ,$val) { return $val; },
	'input_validator'=>function($cmd,$db,$tab,$col,$typ,$val,$ctx) { return true; },
	'before'=>function(&$cmd,&$db,&$tab,&$id,&$in) { /* adjust array $in */ },
	'after'=>function($cmd,$db,$tab,$id,$in,$out) { /* do something */ },
// configurable options
	'allow_origin'=>'*',
	'auto_include'=>true,
// dependencies (added for unit testing):
	'db'=>null,
	'method'=>$_SERVER['REQUEST_METHOD'],
	'request'=>$_SERVER['PATH_INFO'],
	'get'=>$_GET,
	'post'=>file_get_contents('php://input'),
	'origin'=>$_SERVER['HTTP_ORIGIN'],
));
$api->executeCommand();
```

***NOTA***: La opción "socket" no es compatible con MS SQL Server. SQLite espera el nombre del archivo en el campo "base de datos".

## Documentación
Después de la configuración, puede beneficiarse directamente de la documentación API generada.

    http://localhost/api.php

Pruebe el [editor] (http://jsonviewer.stack.hu) para verlo rápidamente.

## Uso de la API

Puede hacer todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y una operación de Lista adicional. Aquí es cómo:

### Lista

Lista todos los registros de una tabla de base de datos.

```
GET http://localhost/api.php/categories
```

Salida:

```
{"categories":{"columns":["id","name"],"records":[[1,"Internet"],[3,"Desarrollo Web"]]}}
```

### Lista + Transformar

Enumere todos los registros de una tabla de base de datos y transfórmelos en objetos.

```
GET http://localhost/api.php/categories?transform=1
```

Salida:

```
{"categories":[{"id":1,"name":"Internet"},{"id":3,"name":"Desarrollo Web"}]}
```

### Lista + Filtro

La búsqueda se implementa con el parámetro "filtro". Debe especificar el nombre de columna, una coma, el tipo de coincidencia, otra coma y el valor que desea filtrar. Estos son tipos de concordancia admitidos:

  - cs: contener cadena (cadena contiene valor)
  - sw: comienza con (cadena comienza con valor)
  - ew: final con (cadena final con valor)
  - eq: igual (cadena o número coincide exactamente)
  - lt: menor que (el número es menor que el valor)
  - le: menor o igual (el número es menor o igual que el valor)
  - ge: mayor o igual (el número es mayor o igual que el valor)
  - gt: mayor que (el número es más alto que el valor)
  - bt: between (el número está entre dos valores separados por comas)
  - in: in (el número o cadena está en una lista de valores separados por comas)
  - is: is null (el campo contiene el valor "NULL")

Puede negar todos los filtros anteponiendo un carácter 'n', de modo que 'eq' se convierte en 'neq'.

```
GET http://localhost/api.php/categories?filter=name,eq,Internet
GET http://localhost/api.php/categories?filter=name,sw,Inter
GET http://localhost/api.php/categories?filter=id,le,1
GET http://localhost/api.php/categories?filter=id,ngt,2
GET http://localhost/api.php/categories?filter=id,bt,1,1
GET http://localhost/api.php/categories?filter=categories.id,eq,1
```

Salida:

```
{"categories":{"columns":["id","name"],"records":[[1,"Internet"]]}}
```

***Nota***: Puede especificar el nombre de la tabla antes del nombre del campo, separado por un punto.

### List + Filter + Cumplir

Se pueden aplicar múltiples filtros usando "filtro []" en lugar de "filtro" como nombre de parámetro. A continuación, el parámetro "satisfy" se utiliza para indicar si se debe cumplir con el filtro [all] "todos" (predeterminado) o [any] "cualquiera" para generar una coincidencia:

```
GET http://localhost/api.php/categories?filter[]=id,eq,1&filter[]=id,eq,3&satisfy=any
GET http://localhost/api.php/categories?filter[]=id,ge,1&filter[]=id,le,3&satisfy=all
GET http://localhost/api.php/categories?filter[]=id,ge,1&filter[]=id,le,3&satisfy=categories.all
GET http://localhost/api.php/categories?filter[]=id,ge,1&filter[]=id,le,3
```

Salida:

```
{"categories":{"columns":["id","name"],"records":[[1,"Internet"],[3,"Desarollo Web"]]}}
```

***Nota***: Puede especificar "satisfy = categories.all, posts.any" si quiere mezclar "y" y "o" para diferentes tablas.


### Lista + Seleccionar Columna

La selección de columnas Por defecto, todas las columnas están seleccionadas. Con el parámetro "columns" puede seleccionar columnas específicas. Las columnas múltiples deben estar separadas por comas.
Se puede usar un asterisco ("*") como un comodín para indicar "todas las columnas". Similar a "columns" puede usar el parámetro "exclude" para eliminar ciertas columnas:
```
GET http://localhost/api.php/categories?columns=name
GET http://localhost/api.php/categories?columns=categories.name
GET http://localhost/api.php/categories?exclude=categories.id
```

Salida:

```
{"categories":{"columns":["name"],"records":[["Desarrollo Web"],["Internet"]]}}
```

***Nota***: Las columnas que se utilizan para incluir entidades relacionadas se agregan automáticamente y no se pueden dejar fuera de la salida.

### Lista + Orden

Con el parámetro "order" puede ordenar. Por defecto, el orden está en orden ascendente, pero al especificar "desc" esto puede invertirse:

```
GET http://localhost/api.php/categories?order=name,desc
GET http://localhost/api.php/posts?order[]=icon,desc&order[]=name
```

Salida:

```
{"categories":{"columns":["id","name"],"records":[[3,"Desarrollo Web"],[1,"Internet"]]}}
```

***Nota***: Puede ordenar múltiples campos usando "order[]" en lugar de "order" como nombre de parámetro.

### Lista + Orden + Paginación

El parámetro "page" contiene la página solicitada. El tamaño de página predeterminado es 20, pero se puede ajustar (por ejemplo, a 50):

```
GET http://localhost/api.php/categories?order=id&page=1
GET http://localhost/api.php/categories?order=id&page=1,50
```

Salida:

```
{"categories":{"columns":["id","name"],"records":[[1,"Internet"],[3,"Desarrollo Web"]],"results":2}}
```

***Nota***: Las páginas que no están ordenadas no pueden ser paginadas.

### Crear

Puede agregar fácilmente un registro utilizando el método POST (x-www-form-urlencoded, consulte rfc1738). La llamada devuelve la "last insert id".

```
POST http://localhost/api.php/categories
id=1&name=Internet
```

Salida:

```
1
```

***Nota***: Tenga en cuenta que los campos que no están especificados en la solicitud obtienen el valor predeterminado como se especifica en la base de datos.

### Crear (con el objeto JSON)

Alternativamente, puede enviar un objeto JSON en el cuerpo. La llamada devuelve la "last insert id".

```
POST http://localhost/api.php/categories
{"id":1,"name":"Internet"}
```

Salida:

```
1
```

***Nota***: Tenga en cuenta que los campos que no están especificados en la solicitud obtienen el valor predeterminado como se especifica en la base de datos.

### Crear (con matriz JSON)

Alternativamente, puede enviar una matriz JSON que contenga múltiples objetos JSON en el cuerpo. La llamada devuelve una matriz de valores de "last insert id".

```
POST http://localhost/api.php/categories
[{"name":"Internet"},{"name":"Programación"},{"name":"Desarrollo Web"}]
```

Salida:

```
[1,2,3]
```

***Nota***: Esta llamada usa una transacción e insertará todos o ninguno de los registros. Si la transacción falla, devolverá 'null'.

### Leer

Si quiere leer un solo objeto, puede usar:

```
GET http://localhost/api.php/categories/1
```

Salida:

```
{"id":1,"name":"Internet"}
```

### Leer (Multiples)

Si quiere leer múltiples objetos, puede usar:

```
GET http://localhost/api.php/categories/1,2
```

Salida:

```
[{"id":1,"name":"Internet"},{"id":2,"name":"Programacíon"}]
```

### Actualizar

La edición de un registro se realiza con el método PUT. La llamada devuelve el número de filas afectadas.

```
PUT http://localhost/api.php/categories/2
name=Internet+networking
```

Salida:

```
1
```

***Nota***: Tenga en cuenta que solo se actualizarán los campos que se especifican en la solicitud.

### Actualización (con el objeto JSON)

Alternativamente, puede enviar un objeto JSON en el cuerpo. La llamada devuelve el número de filas afectadas.

```
PUT http://localhost/api.php/categories/2
{"name":"Redes de Internet"}
```

Salida:

```
1
```

***Nota***: Tenga en cuenta que solo se actualizarán los campos que se especifican en la solicitud.

### Actualización (con matriz JSON)

Alternativamente, puede enviar una matriz JSON que contenga múltiples objetos JSON en el cuerpo. La llamada devuelve una matriz de las filas afectadas.

```
PUT http://localhost/api.php/categories/1,2
[{"name":"Internet"},{"name":"Programacíon"}]
```

Salida:

```
[1,1]
```

***Nota***: El número de valores de clave primaria en la URL debe coincidir con la cantidad de elementos en la matriz JSON (y debe estar en el mismo orden).

Esta llamada usa una transacción y actualizará todos o ninguno de los registros. Si la transacción falla, devolverá 'null'.

### Borrar

La solicitud tipo DELETE se usa para eliminar un registro. La llamada devuelve el número de filas afectadas.

```
DELETE http://localhost/api.php/categories/2
```

Salida:

```
1
```

### Eliminar (múltiples)

La solicitud tipo DELETE también se puede usar para borrar múltiples registros. La llamada devuelve el número de filas afectadas para cada valor de clave principal especificado en la URL.

```
DELETE http://localhost/api.php/categories/1,2
```

Salida:

```
[1,1]
```

Esta llamada usa una transacción y eliminará todos o ninguno de los registros. Si la transacción falla, devolverá 'null'.

## Relaciones

La explicación de esta característica se basa en la estructura de datos del archivo de base de datos `` `blog.sql```. Esta base de datos es una estructura de datos de blog muy simple con las correspondientes relaciones de clave externa entre las tablas. Estas restricciones de clave externa son necesarias ya que la detección de relación se basa en ellas, no en el nombre de la columna.

Puede obtener la "publicación" que tiene "id" igual a "1" con sus correspondientes "categorías", "etiquetas" y "comentarios" usando:

```
GET http://localhost/api.php/posts?include=categories,tags,comments&filter=id,eq,1
```

Salida:

```
{
    "posts": {
        "columns": [
            "id",
            "user_id",
            "category_id",
            "content"
        ],
        "records": [
            [
                1,
                1,
                1,
                "blog started"
            ]
        ]
    },
    "post_tags": {
        "relations": {
            "post_id": "posts.id"
        },
        "columns": [
            "id",
            "post_id",
            "tag_id"
        ],
        "records": [
            [
                1,
                1,
                1
            ],
            [
                2,
                1,
                2
            ]
        ]
    },
    "categories": {
        "relations": {
            "id": "posts.category_id"
        },
        "columns": [
            "id",
            "name"
        ],
        "records": [
            [
                1,
                "anouncement"
            ]
        ]
    },
    "tags": {
        "relations": {
            "id": "post_tags.tag_id"
        },
        "columns": [
            "id",
            "name"
        ],
        "records": [
            [
                1,
                "funny"
            ],
            [
                2,
                "important"
            ]
        ]
    },
    "comments": {
        "relations": {
            "post_id": "posts.id"
        },
        "columns": [
            "id",
            "post_id",
            "message"
        ],
        "records": [
            [
                1,
                1,
                "great"
            ],
            [
                2,
                1,
                "fantastic"
            ]
        ]
    }
}
```

Puede llamar a la función `` `php_crud_api_transform()` `` para estructurar los datos jerárquicos de esta manera:

```
{
    "posts": [
        {
            "id": 1,
            "post_tags": [
                {
                    "id": 1,
                    "post_id": 1,
                    "tag_id": 1,
                    "tags": [
                        {
                            "id": 1,
                            "name": "funny"
                        }
                    ]
                },
                {
                    "id": 2,
                    "post_id": 1,
                    "tag_id": 2,
                    "tags": [
                        {
                            "id": 2,
                            "name": "important"
                        }
                    ]
                }
            ],
            "comments": [
                {
                    "id": 1,
                    "post_id": 1,
                    "message": "great"
                },
                {
                    "id": 2,
                    "post_id": 1,
                    "message": "fantastic"
                }
            ],
            "user_id": 1,
            "category_id": 1,
            "categories": [
                {
                    "id": 1,
                    "name": "anouncement"
                }
            ],
            "content": "blog started"
        }
    ]
}
```

***Nota***: Esta función de transformación está disponible para PHP, JavaScript y Python en los archivos `` `php_crud_api_transform.php```,``` php_crud_api_transform.js``` y ```php_crud_api_transform.py``` en la carpeta " lib ".

## Permisos

Por defecto, una sola base de datos se expone con todas sus tablas y columnas en modo de lectura-escritura. Puede cambiar los permisos especificando una función 'table_authorizer' y / o 'column_authorizer' que devuelve un booleano que indica si la tabla o columna está permitida para una acción CRUD específica.

## Filtro de registro

Al definir una función 'record_filter' puede aplicar un filtro forzado, por ejemplo para implementar roles en un sistema de base de datos.

La regla "you cannot view unpublished blog posts unless you have the admin role"/"no puede ver publicaciones de blog no publicadas a menos que tenga la función de administrador" se puede implementar con este filtro.

```
return ($table=='posts' && $_SESSION['role']!='admin')?array('published,nis,null'):false;
```

## Multiple Tendencia

El 'tenancy_function' le permite exponer una API para un esquema de base de datos de múltiples usuarios. En el modelo más simple todas las tablas tienen una columna llamada 'customer_id' y la 'tenancy_function' se define como:

```
return $col=='customer_id'?$_SESSION['customer_id']:null
```

En este ejemplo, `` `$ _SESSION ['customer_id']` `` es el cliente autenticado en su API.

## Sanitización de entrada

Por defecto, todas las entradas son aceptadas y enviadas a la base de datos. Si desea desnudar (ciertas) etiquetas HTML antes de almacenarlas, puede especificar un función 'input_sanitizer' que devuelve el valor ajustado.

## Validación de entrada

Por defecto, todas las entradas son aceptadas. Si desea validar la entrada, puede especificar una función 'input_validator' que devuelve un booleano indicando si el valor es válido o no.

## Multiple Base de datos

El código también es compatible con API de varias bases de datos. Estos tienen URL donde el primer segmento en la ruta es la base de datos y no el nombre de la tabla.
Esto se puede habilitar al NO especificar una base de datos en la configuración. Además, los permisos en la configuración deben contener un punto que es el carácter para separar la base de datos del nombre de la tabla. Las bases de datos 'mysql', 'information_schema' y 'sys' se bloquean automáticamente.

## Incremento atómico (para contadores)

El aumento del campo numérico de un registro se realiza con el método PATCH (se ignoran los campos no numéricos).
El decremento se puede hacer usando un valor de incremento negativo.
Para agregar '2' al campo 'visitantes' en la tabla de 'eventos' para registrar con la clave principal '1', ejecute:

```
PATCH http://localhost/api.php/events/1
{"visitors":2}
```

Salida:

```
1
```

La llamada devuelve el número de filas afectadas. Tenga en cuenta que se pueden incrementar múltiples campos y que las operaciones por lotes son compatibles (ver: actualización / PUT).

## Datos binarios


Los campos binarios se detectan automáticamente y los datos en esos campos se devuelven utilizando la codificación base64.

```
GET http://localhost/api.php/categories/2
```

Salida:

```
{"id":2,"name":"funny","icon":"ZGF0YQ=="}
```

Al enviar un registro que contiene un campo binario, también deberá enviar datos codificados en base64.

```
PUT http://localhost/api.php/categories/2
icon=ZGF0YQ
```

En el ejemplo anterior, verá cómo se envían los datos binarios. Tanto "base64url" como "base64" estándar están permitidos (ver rfc4648).

## Cargas de archivos

También puede cargar un archivo usando un formulario web (multipart / form-data) como este:

```
<form method="post" action="http://localhost/api.php/categories" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="icon">
  <input type="submit">
</form>
```

Entonces esto se maneja como si hubiera enviado:

```
POST http://localhost/api.php/categories
{"icon_name":"not.gif","icon_type":"image\/gif","icon":"ZGF0YQ==","icon_error":0,"icon_size":4}
```

Como puede ver, se agregan los metacaps "xxx_name", "xxx_type", "xxx_error" y "xxx_size" (donde "xxx" es el nombre del campo del archivo).

***Nota***: No puede editar un archivo con este método, porque los navegadores no admiten el método "PUT" en estos formularios.

## Soporte espacial / GIS

También hay soporte para filtros espaciales:
    - sco: espacial contiene (la geometría contiene otra)
    - scr: cruces espaciales (la geometría se cruza con otra)
    - sdi: disjuntos espaciales (la geometría es disjunta de otro)
    - seq: espacial igual (la geometría es igual a otra)
    - sin: intersecciones espaciales (la geometría se cruza con otra)
    - sov: superposiciones espaciales (la geometría se superpone a otra)
    - sto: toques espaciales (la geometría toca a otra)
    - swi: espacial dentro (la geometría está dentro de otra)
    - sic: espacial está cerrado (la geometría es cerrada y simple)
    - sis: espacial es simple (la geometría es simple)
    - siv: espacial es válido (la geometría es válida)

También puede negar estos filtros anteponiendo un carácter 'n', de modo que 'sco' se convierta en 'nsco'.

Ejemplo:

```
GET http://localhost/api.php/countries?columns=name,shape&filter[]=shape,sco,POINT(30 20)
```

Salida:

```
{"countries":{"columns":["name","shape"],"records":[["Italy","POLYGON((30 10,40 40,20 40,10 20,30 10))"]]}}
```

Al enviar un registro que contiene un campo de geometría (espacial), también deberá enviar una cadena WKT.

```
PUT http://localhost/api.php/users/1
{"location":"POINT(30 20)"}
```

En el ejemplo anterior, verá cómo se envía una [secuencia WKT] (https://en.wikipedia.org/wiki/Well-known_text).

## Soporte de datos no estructurados

Puede almacenar documentos JSON en tipos de campo JSON (MySQL), JSONB (PostgreSQL) o XML (SQL Server) en la base de datos.
Estos documentos no tienen esquema. El espacio en blanco en la estructura no se mantiene.

## Enviando NULL

Al utilizar el método POST (x-www-form-urlencoded, consulte rfc1738), se puede establecer un valor NULL de base de datos usando un parámetro con el sufijo "__is_null":

```
PUT http://localhost/api.php/categories/2
name=Internet&icon__is_null
```

Al enviar datos JSON, el envío de un valor NULL para un campo de base de datos con nulos es más fácil ya que puede usar el valor "null" de JSON (sin comillas).

```
PUT http://localhost/api.php/categories/2
{"name":"Internet","icon":null}
```

## Campos automáticos

Antes de cualquier operación, se llama a la función 'before' que le permite configurar algunos campos automáticos.
Tenga en cuenta que el parámetro 'input' es escribible y es un objeto (o 'falso' cuando falta o no es válido).

## Eliminación suave

La función 'before' permite la modificación de los parámetros de solicitud y puede (por ejemplo) utilizarse para implementar el comportamiento de eliminación de software.

```php
'before'=>function(&$cmd, &$db, &$tab, &$id, &$in) { 
	if ($cmd == 'delete') {
		$cmd = 'update'; // change command to update
		$in = (object)array('deleted' => date('Y-m-d H:i:s', time()));
	}
},
'column_authorizer'=>function($cmd, $db ,$tab, $col) { 
	return ( ! in_array($col, array('deleted')));
},
'record_filter'=>function($cmd,$db,$tab) { 
	return array('deleted,is,null');
}
```

## Custom actions

After any operation the 'after' function is called that allows you to do some custom actions.
Note that the output parameter is not filled for 'read' or 'list' operations due to the streaming nature of the API.

## CORS multidominio

Al especificar `allow_origin` en la configuración, puede controlar el encabezado de respuesta` Access-Control-Allow-Origin` que se está enviando.

Si establece `allow_origin` en` * `, el encabezado de respuesta` Access-Control-Allow-Origin` se establecerá en `*`.
En todos los demás casos, el encabezado de respuesta `Access-Control-Allow-Origin` se establece en el valor del encabezado de solicitud` Origin` cuando se encuentra una coincidencia.
 
También puede especificar `allow_origin` a `https://*.yourdomain.com` que coincida con cualquier host que comience por `https://` y termine en `.yourdomain.com`.

Se pueden especificar múltiples hosts mediante una coma, lo que le permite establecer `allow_origin` en` https://tudominio.com, https://*.tudominio.com`

## Enteros de 64 bits en JavaScript

JavaScript no admite enteros de 64 bits. Todos los números se almacenan como valores de punto flotante de 64 bits. La mantisa de un punto flotante de 64 bits
el número es solo de 53 bits y es por eso que todos los números enteros mayores a 53 bits pueden causar problemas en JavaScript.

## Errores

Se pueden informar los siguientes tipos de errores 404 'No encontrado':

    - entity (no se pudo encontrar la entidad)
    - object (instancia no encontrada en lectura)
    - input (instancia no encontrada en crear)
    - subject (instancia no encontrada en la actualización)
    - 1pk (clave principal no encontrada o compuesta)

## Pruebas

Estoy probando principalmente en Ubuntu y tengo las siguientes configuraciones de prueba:

  - Ubuntu 12.04 Server with PHP 5.3 and MySQL 5.5 and PostgreSQL 9.1
  - Ubuntu 14.04 Server with PHP 5.5 and MySQL 5.5 and PostgreSQL 9.3
  - Ubuntu 16.04 Server with PHP 7.0 and MySQL 5.7 / MariaDB 10.0 and PostgreSQL 9.5
  - Debian 7 Server with PHP 5.4 and MySQL 5.5 and PostgreSQL 9.1
  - Debian 8 Server with PHP 5.6 and MySQL 5.5 / MariaDB 10.0 and PostgreSQL 9.4
  - Debian 9 Server with PHP 7.0 and MySQL 5.5 / MariaDB 10.1 and PostgreSQL 9.6
  - CentOS 7 Server with PHP 5.4 and MariaDB 5.5 and PostgreSQL 9.2
  - Windows 2012 R2 with PHP 5.6 and SQL Server 2012
  - Windows 2008 R2 with PHP 5.6 and SQL Server 2008

Esto debería cubrir la mayoría de los entornos, pero por favor notifíqueme de las pruebas fallidas e informe su entorno.
Trataré de cubrir la mayor parte de la configuración anterior en la carpeta "docker" del proyecto.

### Travis CI

Desafortunadamente, no todas las pruebas están automatizadas. ¡Las contribuciones en esta área son muy bienvenidas!

### MySQL, PostgreSQL, y SQLite en Linux

Las pruebas se guardan en el archivo `Tests.php`, pero primero debe copiar el archivo` Config.php.dist` en `Config.php` y agregar sus credenciales de base de datos. Puede agregar credenciales para una o todas las bases de datos admitidas.

Después de configurar las conexiones de la base de datos, use PHPUnit para ejecutar todas las pruebas:

```
$ wget https://phar.phpunit.de/phpunit.phar
$ php phpunit.phar

Time: 11.16 seconds, Memory: 12.00MB

OK, but incomplete, skipped, or risky tests!
Tests: 6004, Assertions: 338, Skipped: 76.
$
```

You can also run tests for only one database at a time if you'd like. For example to run MySQL tests, specify the `MysqlTest.php` file:

```
$ php phpunit.phar tests/MysqlTest.php

Time: 3.54 seconds, Memory: 10.00MB

OK (76 tests, 113 assertions)
$
```

***Nota***: DEBE usar una base de datos vacía cuando se cargue un accesorio de base de datos destructivo.

### Servidor SQL en Windows:

```
C:\api-rest-php>c:\PHP\php.exe phpunit.phar tests\SqlServerTest.php
C:\api-rest-php>
```

NB: DEBE usar una base de datos vacía como accesorio de base de datos destructiva (se carga 'blog sqlserver.sql').

## Instalación de MySQL en Ubuntu Linux

### Ubuntu 12.04

```
apt-get -y remove mysql-server
apt-get -y autoremove
apt-get -y install software-properties-common
add-apt-repository -y ppa:ondrej/mysql-5.6
apt-get update
apt-get -y install mysql-server
```

## Instalación de PostGIS en Ubuntu Linux

### Ubuntu 12.04

Instale PostGIS en Ubuntu Linux con los siguientes comandos:

```
sudo apt-get install python-software-properties
sudo apt-add-repository ppa:ubuntugis/ppa
sudo apt-get update
sudo apt-get install postgresql-9.1-postgis-2.0
```

### Ubuntu 14.04

Instale PostGIS en Ubuntu Linux con el siguiente comando:

```
sudo apt-get install postgresql-9.3-postgis-2.1
```

### Ubuntu 16.04

Instale PostGIS en Ubuntu Linux con el siguiente comando:

```
sudo apt-get install postgresql-9.5-postgis-2.2
```

### Para todas las distribuciones

Ahora habilite la extensión PostGIS para su base de datos:

```
sudo -u postgres psql phpcrudapi -c "CREATE EXTENSION postgis;"
```

En la cadena de arriba "phpcrudapi" es el nombre de su base de datos.

## Ejemplo de configuración de Nginx
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name server_domain_or_IP;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ [^/]\.php(/|$) {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        try_files $fastcgi_script_name =404;
        set $path_info $fastcgi_path_info;
        fastcgi_param PATH_INFO $path_info;
        fastcgi_index index.php;
        include fastcgi.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## Pretty URL

Puede "reescribir" la URL para eliminar el "api.php" de la URL.

### Apache

Habilite mod_rewrite y agregue lo siguiente a su archivo ".htaccess":

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ api.php/$1 [L,QSA]
```

El archivo ".htaccess" debe ir en la misma carpeta que "api.php".

### Nginx

Para Nginx es posible que desee agregar algo como esto:

```
location /api {
    rewrite ^/api(.*)$ /api.php$1 last;
}
```

Esto debe agregarse a su configuración de Nginx, antes o después de la sección `ubicación ~ [^ /] \. Php (/ | $)`.

## Depuración

Si tiene problemas para hacer que el archivo funcione, es posible que desee verificar las dos variables de entorno utilizadas. Descomente la siguiente línea:

```
var_dump($_SERVER['REQUEST_METHOD'],$_SERVER['PATH_INFO']); die();
```

Y luego visita:

```
http://localhost/api.php/posts
```

Esto debería dar como resultado:

```
string(3) "GET"
string(6) "/posts"
```

Si no es así, algo está mal en su servidor.

## Instalación del compositor

Puede usar [Composer] (https://getcomposer.org/) para instalar. Incluya la biblioteca en su archivo composer.json:

```json
{
    "require": {
        "feliphegomez/api-rest-php": "origin"
    }
}
```

Ejecute `composer install` y luego use la biblioteca en su propio código de esta manera:

```php
<?php

include './vendor/autoload.php';

// DB Connection
$api = new PHP_CRUD_API(array(
 	'dbengine'=>'MySQL',
 	'hostname'=>'{DB-HOSTNAME-OR-IP}',
 	'username'=>'{DB-USER}',
 	'password'=>'{DB-PASSWORD}',
	'database'=>'{DB-NAME}',
	'charset'=>'utf8'
));
$api->executeCommand();

```

## Licencia

GNU General Public License
https://www.gnu.org/licenses/gpl.html

Más información en feliphegomez@gmail.com.