db.productos.insertMany([
    {
        "title": "Escuadra",
        "price": "90",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    },
    {
        "title": "Calculadora",
        "price": "234.56",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    },
    {
        "title": "Globo Terráqueo",
        "price": "345.67",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "title": "Calculadora",
        "price": "234.56",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    },
    {
        "title": "Tiza",
        "price": "150",
        "thumbnail": "https://th.bing.com/th/id/OIP.Yq3VSiVMSu7Q1WgEOCxaHAHaHa?w=185&h=184&c=7&o=5&dpr=1.25&pid=1.7"
    },
    {
        "title": "Block de hojas",
        "price": "200",
        "thumbnail": "https://www.stampaprint.net/es/blog/wp-content/uploads/2018/02/ORFHM81-770x360.jpg"
    },
    {
        "title": "Set lapiceras",
        "price": "300",
        "thumbnail": "https://th.bing.com/th/id/OIP.BNCKyCOEhbjXevGfg-2UwQHaEK?w=313&h=180&c=7&o=5&dpr=1.25&pid=1.7"
    },
    {
        "title": "Goma de borrar",
        "price": "30",
        "thumbnail": "https://th.bing.com/th/id/OIP.N9epc7DHO9idrG5iJWzviAHaHa?w=197&h=197&c=7&o=5&dpr=1.25&pid=1.7",
    },
    {
        "title": "Voligoma",
        "price": "50",
        "thumbnail": "https://th.bing.com/th/id/OIP.3UTHWlFRkIwsFDkfmr8nKwHaHa?w=206&h=206&c=7&o=5&dpr=1.25&pid=1.7",
    },
    {
        "title": "Cartuchera",
        "price": "400",
        "thumbnail": "https://th.bing.com/th/id/R.396633a19a02a265c94b842e587c95d0?rik=4gPWFqrQ%2bN4fug&riu=http%3a%2f%2fwww.misutiles.com%2f5575-thickbox_default%2fcartuchera-de-jean-rectangular-grande.jpg&ehk=mqamJY%2fNxmsO2jRnWWFdaJgPWyE3FNmFys74uY44YMY%3d&risl=&pid=ImgRaw",
    }
])

db.mensajes.insertMany([
    { "author": "pablo@gmail.com", "text": "Hola", "fyh": "6/24/2021" },
    { "author": "brenda@gmail.com", "text": "Hola, Todo bien?", "fyh": "6/24/2021" },
    { "author": "pablo@gmail.com", "text": "Si, y vos? Como va todo en Miami", "fyh": "6/24/2021" },
    { "author": "brenda@gmail.com", "text": "Me alegro =)", "fyh": "6/24/2021" },
    { "author": "brenda@gmail.com", "text": "Re bien acá, uds?", "fyh": "6/24/2021" },
    { "author": "pablo@gmail.com", "text": "Bien por suerte ya casi termino los cursos de Coder", "fyh": "6/24/2021" },
    { "author": "brenda@gmail.com", "text": "Genial, con lo de developer vas a ganar plata", "fyh": "6/24/2021" },
    { "author": "pablo@gmail.com", "text": "Si tal cual, aca esta dificil la cosa", "fyh": "6/24/2021" },
    { "author": "brenda@gmail.com", "text": "Claro, bueno nos vemos, suerte en todo", "fyh": "6/24/2021" },
    { "author": "pablo@gmail.com", "text": "Igualmente, éxitos, nos hablamos!", "fyh": "6/24/2021" }
])

db.productos.find()
db.mensajes.find()

db.productos.count()
db.mensajes.count()

db.productos.insertOne({
    "title": "Tijera",
    "price": "500",
    "thumbnail": "https://th.bing.com/th/id/OIP.6XJ3BCCEf9kClmViEAO2rQHaHa?w=214&h=214&c=7&o=5&dpr=1.25&pid=1.7"
})

db.productos.find({ price: { $lt: 1000 } }, { title: 1 })

db.productos.find({ price: { $gt: 1000, $lt: 3000 } }, { title: 1 })

db.productos.find({ price: { $gt: 3000 } }, { title: 1 })

db.productos.find({}, { title: 1 }).sort({ price: 1 }).skip(2).limit(1)

db.productos.updateMany({}, { $set: { stock: 100 } })

db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } })

db.productos.deleteMany({ price: { $lt: 1000 } })

db.createUser({
    user: 'pepe',
    pwd: 'asd456',
    roles: [
        { role: 'read', db: 'ecommerce' }
    ]
})