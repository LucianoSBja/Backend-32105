const fs = require("fs")

module.exports = class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    // =Guardar objeto 
    async save(objeto) {
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const producto = JSON.parse(data)
            const id = producto.length + 1;
            objeto.id = id;
            producto.push(objeto)
            const usuariosString = JSON.stringify(producto)
            await fs.promises.writeFile(`${this.archivo}`, usuariosString)
            return producto
        } catch (error) {
            console.error("Error en la creacion de producto")
        }
    }

    // Devolver el array completo
    async getAll() {
        try{
        const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
        return JSON.parse(data) ;
    }catch{
        console.error("Error desafio 3")
    }}

// Obtener 1 producto por ID 
async getById(id){
const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
const productos = JSON.parse(data)
const producto = productos.find((producto)=> producto.id == id)
if(producto){
return producto;
}else{
    return "Producto no encontrado"}
}

// Eliminar por id.
async deleteById(id) {
    try{
    const data = fs.readFileSync(`${this.archivo}`, "utf-8");
    const productos = JSON.parse(data);
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    const dataString = JSON.stringify(nuevosProductos);
    fs.writeFileSync(`${this.archivo}`, dataString);
    return nuevosProductos;
}catch{
    console.error("Error al eliminar por ID")
}
  }

  //Eliminar todo
  deleteAll() {
    try{
        fs.writeFileSync(`${this.archivo}`, "[]");
        return "[]";
    }catch{
        console.error("Error al eliminar la base")
    }
  }
}



 