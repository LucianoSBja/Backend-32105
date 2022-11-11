# API CONTAINER

Se va a manejar el módulo knex para realizar el CRUD en las bases de datos (mariaDB y SQLite3).
Los métodos que se van a utilizar se van a encargar de las validaciones y la reescritura de este archivo.

```javascript
const knex = require("knex");
```

## Métodos

Todos los métodos estarán incluidos en la clase Container, cuyo constructor recibe como parámetro la configuración y el nombre de la tabla a trabajar.

### Save 

- Recibe un objeto, lo guarda en la base de datos y devuelve el objeto, para trabajar con el usuario en los mensajes.

```javascript
export default class Container {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async save(object) {
    try {
      // Se corrobora si el objeto existe en el archivo
      const productFound = await this.knex
        .from(this.table)
        .where("title", object.title);
// Esta comprobación enviará un array con un objeto con un nombre predeterminado, el cuál tendrá los datos del objeto encontrado, si no lo encuentra, envía el array vacío
      if (productFound.length != 0) {
        // Si lo encuentra, retorna null
        return null;
      } else {
        // Si no lo encuentra, lo graba en la base de datos
        await this.knex.insert(object).into(this.table);
        return object;
      }
    } catch (error) {
      // Handler error
      console.error(`Se produjo un error en save:${error}`);
    }
  }
```

### Update

- Recibe un id y modifica el objeto con ese id, por un nuevo objeto ingresado

```javascript
export default class Container {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }
  async update(idEntered, object) {
    try {
      // Se corrobora si el objeto existe en el archivo
      const productFound = await this.knex
        .from(this.table)
        .where("id", idEntered);

      if (productFound.length != 0) {
        // Si encuentra el objeto, modifica sus propiedades
        await this.knex.from(this.table).where("id", idEntered).update(object);
        return productFound;
      } else {
        // Si no lo encuentra, retorna null
        return null;
      }
    } catch (error) {
      // Handler error
      console.error(`Se produjo un error en saveById:${error}`);
    }
  }
}
```

### Get By Id y Get All

- Buscará todos los productos en el archivo, y también permite filtrar producto por producto, a través de un id

```javascript
export default class Container {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async getById(idEntered) {
    try {
      // BUsca el producto y lo guarda en una constante
      const idFound = await this.knex.from(this.table).where("id", idEntered);

      if (idFound.length != 0) {
        // Si existe, lo retorna
        console.log(`Se obtuvo el producto ${idFound[0].title}`);
        return idFound;
      } else {
        // Si no existe, retorna null
        console.log("No se han encontrado productos");
        return null;
      }
    } catch (error) {
      // Handler Error
      console.error(`Se produjo un error en getByID: ${error}`);
    }
  }

  async getAll() {
    try {
      // Retorna todos los objetos presentes en la tabla consultada
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      // Handler error
      console.error(`Se ha producido un error en getAll: ${error}`);
    }
  }
}
```

### Delete By Id y Delete All

- Eliminará todos los productos en el archivo, y también permite filtrar producto por producto, y eliminarlo a través de un id

```javascript
export default class Container {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async deleteById(idEntered) {
    try {
      // Busca el producto mediante un id y lo guarda en una constante
      const idFound = await this.knex.from(this.table).where("id", idEntered);
      if (idFound.length != 0) {
        // Si lo encuentra, lo elimina. Retorna el producto eliminado
        console.log(
          `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound[0].title}]]`
        );
        await this.knex.from(this.table).where("id", idEntered).del();
        return idFound[0];
      } else {
        // Si no lo encuentra, retorna null
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
        return null;
      }
    } catch (error) {
      // Handler Error
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    try {
      // Elimina todos los objetos presentes en la tabla
      console.log("Todos los objetos fueron eliminados");
      return await this.knex.from(this.table).del();
    } catch (error) {
      // Handler error
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}
```

# API CHAT

En el caso de la clase Messages, se van a implementar métodos que permitan guardar y recibir mensajes desde la base de datos (SQLite3).

## Métodos

Todos los métodos estarán incluidos en la clase Messages, cuyo constructor recibe como parámetro la configuración y el nombre de la tabla a trabajar, al igual que el constructor de la clase Container.

### saveMesage & readMessages 

- Recibe un objeto (mensaje con propiedades de *nombre*, *timestamp* y el propio *mensaje* envíado desde el cliente), lo guarda en la base de datos y devuelve todos los elementos (mensajes) de la tabla, para poder enviarlos desde sockets. Ambos métodos parecen similares pero a diferencia que save al momento de guardar un mensaje estará también enviando la totalidad de mensajes, con el último agregado.
  
```javascript
export default class Messages {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async saveMessage(object) {
    try {
      // Se inserta un nuevo mensaje en la tabla
      await this.knex.insert(object).into(this.table);
      // Retorna todos los mensajes
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      // Handler error
      console.error(`Se produjo un error en saveMessage:${error}`);
    }
  }

  async readMessages() {
    try {
      // Retorna todos los mensajes, al momento de inicar el chat, el historial de mensajes se reflejará socket por socket
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      // Handler error
      console.error(`Se produjo un error en readMessages:${error}`);
    }
  }
}

```