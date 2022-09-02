const express = require('express');
const app = express();
const Contenedor = require("./conteiner");
const contenedor = new Contenedor("./productos.json");

app.get('/', (req,res)=>{
res.send(`<h1 style="color: red" >Bienvenidos al servidor express</h1>`)
})

app.get('/productos', async (req,res)=>{
    const data = await contenedor.getAll()
    console.log(data)
    res.send(data)
    })

app.get('/productosRandom', async (req, res) => {
    const data = await contenedor.getAll()
    const numero = Math.floor(Math.random() * data.length)
    data === null ? res.send(` ${numero}`) :
        res.json(numero)
})


const server = app.listen(8080, () =>{
    console.log(`Servidor de express iniciado desafio 3`)
})  

server.on("Error", (error) => {
    console.error(`Ocurrio un problema con el servidor  ${error}`);
  });