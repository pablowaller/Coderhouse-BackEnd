const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const messages = [
    {
        author: 'Autor 1',
        text: 'Mensaje 1',
    },

    {
        author: 'Autor 2',
        text: 'Mensaje 2',
    },

    {
        author: 'Autor 3',
        text: 'Mensaje 3',
    },
]

io.on('connection', (socket) => {
    
    console.log('Usuario conectado')
    
    socket.emit('connectionMessage', 'Bienvenidos al socket')

    socket.emit('messageBackend', messages)
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    socket.on('message', (data) => {
        console.log(data)
        messages.push({
            author: data.author,
            text: data.message,
        })

        io.sockets.emit('message', data)
    })
})

setTimeout(() => {
    io.sockets.emit('connectionMessage', 'Mensaje para todos')
}, 10000)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

httpServer.listen(8000, () => console.log('SERVER ON'))
