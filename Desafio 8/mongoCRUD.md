## Creamos la base de datos ecommerce en mongo shell

`use ecommerce`

### **Creamos e insertamos** documentos (10) en la colección _products_, y _messages_

#### PRODUCTS COLLECTION

```
db.products.insertMany([
  {
    title: "Guitarra Alpujarra",
    price: 4750,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_664855-MLA27358402919_052018-O.jpg",
  },
  {
    title: "Bombo legüero",
    price: 1500,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/661/931/products/2211-d3d33073fc32fca2f416203260081526-1024-1024.jpg",
  },
  {
    title: "Violín",
    price: 3600,
    thumbnail:
      "https://solomusica.com.ar/sm2020/6606-large_default/violin-yamaha-v5sa-44.jpg",
  },
  {
    title: "Bajo",
    price: 4200,
    thumbnail:
      "https://y6v8e8y4.rocketcdn.me/wp-content/uploads/2022/08/1500x1500_template-wh-1-1.jpg",
  },
  {
    title: "Acordeón",
    price: 3900,
    thumbnail:
      "https://ar.xprostore.com/image/cache/data/imagenesweb/a5723s-650x650w.jpg",
  },
  {
    title: "Teclado piano",
    price: 2800,
    thumbnail:
      "https://th.bing.com/th/id/R.8c3966630aefa632c3d8e3bb81b3f87a?rik=nlmefOtwkSu3FQ&pid=ImgRaw&r=0",
  },
  {
    title: "Batería 5 cuerpos",
    price: 4999,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_827759-MLA49106228175_022022-O.webp",
  },
  {
    title: "Armónica",
    price: 980,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_641062-MLA26970643101_032018-O.webp",
  },
  {
    title: "Violoncello",
    price: 3210,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_709672-MLA51033791290_082022-O.webp",
  },
  {
    title: "Violoncello eléctrico",
    price: 3560,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_855868-MLA49296531122_032022-O.webp",
  },
]);
```

#### MESSAGES COLLECTION

```
db.messages.insertMany([
  {
    username: "user1@users",
    messsage: "Hi Mark",
    date: "21/10/2022, 16:37:26"
  },
  {
    username: "user2@users",
    messsage: "Hello Lucas, how are you?",
    date: "21/10/2022, 16:39:12"
  },
  {
    username: "user1@users",
    messsage: "fine, did u know when the next class will be?",
    date: "21/10/2022, 16:40:43"
  },
  {
    username: "user3@users",
    messsage: "Hi, i need to know too",
    date: "21/10/2022, 16:43:23"
  },
  {
    username: "user2@users",
    messsage: "I don't know, let's ask Joseph",
    date: "21/10/2022, 16:44:44"
  },
  {
    username: "user2@users",
    messsage: "@Joseph, did u know something?",
    date: "21/10/2022, 16:45:06"
  },
  {
    username: "user1@users",
    messsage: "I think it's not active",
    date: "21/10/2022, 16:47:22"
  },
  {
    username: "user4@users",
    message: "Hi, guys, I think friday at 5",
    date: "21/10/2022, 16:57:34"
  },
  {
    "username": "user4@users",
    "message": "or at 4, I don't remember well",
    "date": "21/10/2022, 16:59:38"
  },
  {
    username: "user3@users",
    messsage: "Just in case I'm going to connect 10 minutes before 4",
    date: "21/10/2022, 17:37:58"
  }
])
```

### **Listamos las colecciones**

- `db.products.find()`

- `db.messages.find()`

### **Vamos a ver las estadísticas de cada collección**

- `db.products.countDocuments()`

- `db.messages.countDocuments()`

### **CRUD**

- **Agregamos un producto más en la colección _products_**

```javascript
db.products.insertOne({
	title: "Púas guitarra",
	price: 780,
	thumbnail: "https://http2.mlstatic.com/D_NQ_NP_920883-MLA45349997453_032021-W.jpg",
});
```

- **Realizamos consultas específicas**

  - _Listar los productos con precio menor a 1000 pesos_ :

  `db.products.find({price:{$lt:1000}})`

  - _Listar los productos con precio entre 1000 y 3000 pesos_ :

  `db.products.find({$and: [{price:{$gte:1000}}, {price:{$lte:3000}}]})`

  - _Listar los productos con precio mayor a 3000 pesos_ :

  `db.products.find({},{title:1, _id:0})`

  - _Realizar una consulta que traiga solo el nombre del tercer producto más barato_

  `db.products.find({},{title:1, _id:0}).skip(2).limit(1).sort({price:1})`

- **Hacer una actualización sobre todos los productos**

  - _Agregamos el campo **stock**, con un valor de 100, a todos los documentos_
    `db.products.updateMany({_id:{$exists:true}},{$set:{stock:100}}, {$upsert:true})`

- **Cambiar el stock a cero de los productos con precios mayores a 4000 pesos**

  - `db.products.updateMany({price:{$gt:4000}},{$set:{stock:0}})`

- **Borrar los productos con precio menor a 1000 pesos**

  - `db.products.deleteMany({price:{$lt:1000}})`

### **Crear un usuario _pepe_, con clave:_asd456_ que solo pueda leer la base de datos ecommerce. Verificar que no pueda cambiar la información**

1. `Use admin`
2. `db.createUser({user:"pepe", pwd:"asd456", roles:[{role:"read", db:"ecommerce"}]})`
