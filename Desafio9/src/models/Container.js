import knex from "knex";

export default class Container {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async save(object) {
    try {
      const productFound = await this.knex
        .from(this.table)
        .where("title", object.title);

      if (productFound.length != 0) {
        return null;
      } else {
        await this.knex.insert(object).into(this.table);
        return object;
      }
    } catch (error) {
      console.error(`Se produjo un error en save:${error}`);
    }
  }

  async update(idEntered, object) {
    try {
      const productFound = await this.knex
        .from(this.table)
        .where("id", idEntered);

      if (productFound.length != 0) {
        await this.knex.from(this.table).where("id", idEntered).update(object);
        return productFound;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error en saveById:${error}`);
    }
  }

  async getById(idEntered) {
    try {
      const idFound = await this.knex.from(this.table).where("id", idEntered);

      if (idFound.length != 0) {
        console.log(`Se obtuvo el producto ${idFound[0].title}`);
        return idFound;
      } else {
        console.log("No se han encontrado productos");
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error en getByID: ${error}`);
    }
  }

  async getAll() {
    try {
      return await this.knex.select("*").from(this.table);
    } catch (error) {
      console.error(`Se ha producido un error en getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    try {
      const idFound = await this.knex.from(this.table).where("id", idEntered);
      if (idFound.length != 0) {
        console.log(
          `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound[0].title}]]`
        );
        await this.knex.from(this.table).where("id", idEntered).del();
        return idFound[0];
      } else {
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
        return null;
      }
    } catch (error) {
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    try {
      console.log("Todos los objetos fueron eliminados");
      return await this.knex.from(this.table).del();
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}
