const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    // ? Recibe un objeto, lo guarda en el archivo y devuelve el id asignado

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // * ¿El producto ya existe en el archivo?
    const productFound = dataParsed.find(({ title }) => title == object.title);

    try {
      if (productFound) {
        // * Si el producto ya existe, avisa por consola y no lo agrega
        console.log("El producto ya existe en el archivo");
      } else {
        // * Si no existe, lo agrega y retorna el id asignado
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        // ! console.log(updatedFile, "Aquí 23");
        console.log(
          `Se ha agregado el siguiente producto: ${object.title} con el id ${object.id}`
        );
        return object.id;
      }
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  async getById(idEntered) {
    // ? Recibe un id y devuelve el objeto con ese id, o null si no está

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // * ¿El producto ya existe en el archivo?
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.table(idFound);
        return idFound;
      } else {
        console.log("No se ha encontrado el producto");
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error en getByID: ${error}`);
    }
  }

  async getAll() {
    // ? Devuelve un array con los objetos presentes en el archivo

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);

    try {
      if (dataParsed.length > 0) {
        console.log(dataParsed);
        return dataParsed;
      } else {
        console.log("No hay elementos disponibles");
      }
    } catch (error) {
      console.error(`Se ha producido un error en getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    // ? Elimina del archivo el objeto con el Id buscado

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // * Se filtran los productos que no cumplen las condiciones (coincidir con el id proporcionado)
    const leakedID = dataParsed.filter(({ id }) => id !== idEntered);
    // * Encuentra el producto con el id proporcionado
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.log(
          `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound.title}]]`
        );
        // * Se actualiza el archivo
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
      } else {
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    // ? Elimina todos los objetos presentes en el archivo
    try {
      console.log("Todos los objetos fueron eliminados");
      // * Borrado de todos los objetos (Se sobreescribe el archivo a un array vacío)
      await fs.writeFileSync(this.file, "[]");
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}

const file = "./products.json";
const contenedor = new Container(file);

let objetoNuevo = {
  title: "Iron.Man.3",
  price: 740,
  thumbnail:
    "Iron.Man.3"
};

let otroObjeto = {
  title: "Avengers: Infinity War",
  price: 500,
  thumbnail:
    "Avengers",
};

//TODO Descomentar para correr las funciones

contenedor.save(objetoNuevo);
contenedor.save(otroObjeto);
// contenedor.getById(3)
// contenedor.getAll();
// contenedor.deleteById(4)
//contenedor.deleteAll()