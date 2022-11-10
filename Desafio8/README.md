# MongoDB

MongoDB es una **base de datos No relaciona, NoSQL**, orientada a documentos que ofrece una gran escalabilidad y flexibilidad, y un modelo de consultas e indexación avanzado.

### Opciones de implementación

MongoDB disponde de dos variantes de despliegue

- **Local:** Con Mongo Server a través de sus opciones Community y Enterprise
- **Remota:** mediante una plataforma configurada en la nube, lista para usar, llamada Mongo Atlas.

### Introducción a MongoDB

- El concepto de bases de datos NoSQL va creciendo y se utiliza con más frecuencia. **MongoDB es la base de datos NoSQL** más conocida.
- El concepto **NoSQL** define sistemas que difieren del modelo clásico SQL: Sistema de bases de datos relacionales. Lo más destacado de NoSQL es que **no usan SQL como lenguaje principal** de consultas.
- **MongoDB** es una base de datos **orientada a documentos**. No se basa en el concepto de Tabla Fila y Registro sino que se apoya en el concepto de **Colección, Documento y Propiedad**

### Documentos embebidos -

Un **documento embebido** es un documento que está **insertado dentro de otro** y que ambos están ligados a la **misma colección.**

De esta manera, las bases de datos orientadas a documentos aportan una gran flexbilidad a la hora de estructurar la información.

# MongoDB: comandos en consola CLI

Algunos comandos para iniciar la operación con la base de datos:

- **`mongo:`** nos conectará de forma automática con el servidor. Actualmente el demonio se ejecuta con el comando mongod
- **`show dbs:`** muestra la lista de bases de datos existentes.
- **`use:`** selecciona la base de datos activa (si no existe, la crea)
- **`show collections:`** muestra la lista de colecciones de esta base
- **`db.personas.insertOne({clave:valor, ...}):`** crea una colección en forma implicita llamada _personas_ y le inserta un documento.
- **`db.personas.find():`** busca todos los documentos que están dentro de la colección _personas_

# MongoDB: ventajas

- La **escalabilidad** y su **carácter descentralizado** hacen que soporte estructuras distribuidas.
- Permiten realizar **sistemas más abiertos y flexibles** debido a su fácil adaptación de nuevas evoluciones de nuestras aplicaciones web.
- **No se requieren potentes recursos** para poder trabajar con bases de datos NoSQL.
- **Optimización** de las **consultas** en base de datos para grandes cantidades de datos almacenados.

# MongoDB: Listado de Comandos

- **show dbs:** listado de bases no vacías
- **use:** crea y selecciona base de trabajo
- **db:** muestra la base actual
- **show collections:** listado de colecciones
- **load:** carga un script de comandos

```javascript
show dbs
use <database_name>
db // prints the current database
show collection
load(myScript.js)

db.coll.drop() // borra una colección y sus índices respectivos
db.dropDatabase() // elimina la base de datos actual


// Create collection
db.createCollection("contacts") // crea una colección en forma explícita

db.coll.stats() // refleja estadísticas del uso de la base
db.coll.storageSize() // tamaño de almacenamiento de la colección
db.coll.totalIndexSize() // tamaño total de todos los índices de la colección
db.coll.totalSize() // tamaño total en bytes de los datos de la colección más el tamaño de cada índice de la colección
db.coll.validate({full: true}) // comprueba la integridad de una colección
db.coll.renameCollection("new_coll", true) // renombra una colección, el 2do parámetro para borrar la colección destino si existe.
```

# Comandos CRUD

# CREATE & READ

### Comando Create (_insert_)

```javascript
db.coll.insertOne({name: "Max"}) // inserta un documento en la selección
db.coll.insert([{name: "Max"}, {name: "Alex"}]) // inserta documentos en la selección - deprecado
db.coll.insert([{name: "Max"}, {name: "Alex"}], {ordered: false}) // Inserta un array de documentos en la selección
db.coll.insert({date: ISODate()})
db.coll.insert({name: "Max"}, {"writeConcern":{"w":"majority", "wtimeout": 5000}}))
```

### Comando Read (_find_)

```javascript
db.coll.findOne(); // Busca un documento dentro de una colección
db.coll.find(); // Retorna todos los documentos de una colección
db.coll.find().pretty(); // conserva un formato de salida
db.coll.find({ name: "Max", age: 32 }); // Busca todos los documentos en una colección que satisfagan el filtro de búsqueda
db.coll.find({ date: "ISODate("2020-09-25ST13:57:17.1802")});
```

## Formato de documento

Cuando insertamos un documento en **MongoDB** el motor de base de datos crea un campo adicional llamado **ObjectId** identificado con la clave **\_id.**
Este es un número compuesto por 12 bytes que asegura un identificador único para cada documento. Se considera clave primaria y contiene tres secciones:

` ObjectId('5b7d297c(Unix Timestamp)c718bc1332(Random Value)12aa94(Count)')`

# TimeStamp converter *https://steveridout.com/mongo-object-time/*

## MongoDB: Contadores

### Comandos Count

Son funciones que cuentan la cantidad de documentos presentes en una colección. Algunas de ellas puedene tener la opción de filtro.

```javascript
db.coll.estimatedDocumentCount(); // Devuelve la cantidad total de documentos encontrados en la colección

db.coll.countDocuments({ key: val }); // Devuelve la cantidad de documentos encontrados en la colección, con filtro de query
```

## READ con filtros

### Operadores para filtros de Query

- **$and:** Realiza operación AND
- **$OR:** Realiza operación OR
- **$lt:** Coincide con valores que son menores que un valor especificado
- **$lte:** Coincide con valores menores o iguales a un valor especificado
- **$gt:** Coincide con valores que son mayores que un valor especificado
- **$gte:** Coincide con valores mayores o iguales a un valor especificado
- **$ne:** Coincide con valores que no son iguales a un valor especificado
- **$eq:** Selecciona los documentos que son iguales a un valor especificado
- **$exists:** Selecciona los documentos según la existencia de un campo
- **$in:** Selecciona los documentos especificados en un array.
- **$nin:** Coincide con ninguno de los valores especificados en un array
- **$size:** Coincide con el nro de elementos especificados
- **$all:** Coincide con todos los valores definidos dentro de un array
- **$elemMatch:** Coincide con algún valor definido dentro del query

### Read con filtros combinados

```javascript
//Logical

db.coll.find({ name: { $not: { $eq: "Max" } } });
db.coll.find({ $or: [{ year: 1958 }, { year: 1959 }] });
db.coll.find({ $nor: [{ price: 1.99 }, { sale: true }] });
db.coll.find({
	$and: [
		{ $or: [{ qty: { $lt: 10 } }, { qty: { $gt: 50 } }] },
		{ $or: [{ sale: true }, { price: { $lt: 5 } }] },
	],
});

// Element

db.coll.find({ name: { $exists: true } });
db.coll.find({ zipCode: { $type: 2 } });
db.coll.find({ zipCode: { $type: "string" } });
```

## Búsqueda avanzada

- **db.coll.distinct(val)** devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.
- **db.coll.find({doc.subdoc:value})** Se utiliza para filtrar documentos
- **db.coll.find({name:/&Max&/i})** filtra usando expresiones regulares

## Proyecciones en MongoDB

- La **proyección** se utiliza para **devolver un conjunto determinado de campos** en un documento. En general devolvermos todos los campos de un documento, pero es posible que no necesitemos todos.
- Es equivalente en SQL de pasar de hacer un _SELECT_ a realizar _SELECT nombredecampo_.
- Las proyecciones deben ser incorporadas en el **segundo parámetro** del comando find.
- Por ej. **db.coll.find({}, {"nombre":1})** muestra sólo el campo, nombre y el \_id de todos los docuemtos de la colección.
- Las proyecciones se realizan indicando el nombre del capo con valor 1 si queremos mostrarlo y 0 por el contrario.

### SORT, LIMIT & SKIP

- **sort({campoA: 1 ó -1, campoB: 1 ó -1, ...}):** Especifica el **orden** en el que la consulta devuelve documentos coincidentes. El ó los campos por los cuales ordena pueden contener los valores 1 y -1, estableciendo orden ascendente y descendente, respectivamente. El orden se evalúa de izquierda a derecha en caso que los valores coincidan.
- **limit(num):** Especifica el **número máximo** de documentos devueltos.
- **skip(offset): Saltea** la cantidad de documentos especificada.

Se pueden usar en forma combinada:
**_db.coll.find().skip(2).limit(3).sort({Employeeid:-1})_**

### UPDATE

Comando Update (y variantes)

```javascript
//Update Many
db.coll.update({ year: 1999 }, { $set: { decade: "90´s" } }, { multi: true });
db.coll.updateMany({ year: 1999 }, { $set: { decade: "90´s" } });

//findOneAndUpdate
db.coll.findOneAndUpdate(
	{ name: "Max" },
	{ $inc: { points: 5 } },
	{ returnNewDocument: true }
);

// Upsert
db.coll.update(
	{ _id: 1 },
	{ $set: { item: "apple" }, $setOnInsert: { defaultQty: 100 } },
	{ upsert: true }
);

// Replace
db.coll.replaceOne({ name: "Max" }, { firstname: "Maxime", surname: "Beugnet" });

// Save
db.coll.save({ item: "book", qty: 40 });
```

### UPDATE: Detalle de comando

**db.coll.updateOne(query, update, options)**

- **query:** especifica el filtro de documentos a ser actualizados.
- **update:** contiene los datos a ser actualizados con sus operadores respectivos: $set, $unset, $inc, $rename, $mul, $min, $max, etc.
- **options:** contiene varias opciones para la actualización, entre ellas:
  - upsert (true o false): Es una opción para hacer un insert en caso de que el registro no exista.
    **db.coll.updateMany(query, update, options)**
  - Igual que el anterior, pero hace una actualización múltiple en caso de que el filtro de query devuelva varios resultados.

### DELETE

```javascript
db.coll.deleteOne({ name: "Max" }); // Elimina un solo documento (el primero que coincida con el filtro query)
db.coll.deleteMany({ name: "Max" }); // Elimina todos los documentos con el filtro especificado.
db.coll.deleteMany({}); // Borra todos los documentos de la colección
```

## Usuarios y Permisos

Creación de un usuario con permisos y su eliminación

```javascript
use admin

db.createUser(
   {
    user: "root",
    pwd: "rootpwd",
    roles: [
    {role:"rootRole", db:"dbRole"}
    ]
   }
)

db.dropUser("root")
```

En **MongoDB** es posible **crear usuarios y asignarles acceso mediante roles.**

**_Crearemos el usuario lector, que solo tiene acceso de lectura._**

Utilizaremos el método **createUser.** Este acepta como parámetro un objeto con las siguientes propiedades.

- **user;** nombre del usuario. Le asignaremos lector.
- **pwd:** contraseña para el usuario.
- **roles:** arreglo de objetos. Sirve si el usuario tendrá acceso a múltiples bases de datos, estableciendo permisos para cada acceso.

IMPORTANTE:

- Ejecutar el servidor con acceso root: **mongod**
- Ejecutar en el cliente **use admin** amtes de createUser(...)

```javascript
db.createUser({
	user: "lector",
	pwd: "123456",
	roles: [{ role: "read", db: "blog" }],
});
```

- **MongoDB** viene con roles predefinidos. Uno de ellos es el **role read**, que permite ejecutar métodos de sólo lectura.
- La **propiedad db** es donde se indica a qué base de datos se le asignará dicho rol.

Con el rol readWrite el usuario tendrá acceso a los **métodos de lectura y escritura** de la base de datos.
A continuación debemos verificar que cada usuario cuenta con los accesos correctos.

```javascript
db.createUser({
	user: "lector",
	pwd: "123456",
	roles: [{ role: "readWrite", db: "blog" }],
});
```

### Pruebas de accesos: usuario _lector_

1. Para poder ingresar al shell de mongo con el usuario usaremos los parámetros -u y -p

   ````
   mongo -u lector -p 123456```

   ````

2. Verificamos si podemos leer los posts.

   ```javascript
   use blog
   db.posts.find()

   ```

3. Obtenemos respuesta correctamente, mostrando los dos documentos existentes.

```javascript
   {"_id": ObjectId("5as1asd1sdas13asdc12ca"), "title": "Artículo 1"}
   {"_id": ObjectId("5as1asd1sdas13asdc12ca"), "title": "Artículo 2"}
```

4. Ahora intentaremos insertar un nuevo documento

```javascript
db.posts.insertOne({ title: "Artículo 3" });
```

5. Debería lanzarnos un error parecido al siguiente:

```javascript
"errmsg": "not authorized on blog to execute command..."
"codeName": "Unauthorized"
```

### Pruebas de accesos: usuario _escritor_

1. Para el usuario escritor, primero debemos salir del shell y volver a loguearnos:

   ````
   mongo -u escritor -p 123456 authenticationDatabase blog```

   ````

2. Leemos los posts usando el método find:

```javascript
   db.posts.find();

   # {"_id": ObjectId("5as1asd1sdas13asdc12ca"), "title": "Artículo 1"}

   # {"_id": ObjectId("5as1asd1sdas13asdc12ca"), "title": "Artículo 2"}

```

3. Funciona bien el permiso de lectura, ahora intentaremos insertar el Artículo #3:

```javascript
db.posts.insertOne({ title: "Artículo 3" });
```

4. Funciona bien el permiso de lectura, ahora intentaremos insertar el Artículo #3

```javascript
{
    "acknowledged":true, "insertedId": ObjectId("5as1asd1sdas13asdc12ca")
}
```

#### Para estas pruebas, es importante ejecutar el servidor en modo autenticación: usar el comando **mongod --auth**
