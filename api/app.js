const express = require('express');
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const path = require('path');
const classesHandler = require('./handlers/classesHandler');

const app = express()
const httpServer = createServer(app)

// init database
const db = require('./models').sequelize

// cors
app.use(cors())

// encoding
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routers
require('./routes/classes.route')(app)
require('./routes/students.route')(app)
require('./routes/cards.route')(app)

// socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', socket => {
    console.log('New Connection')
    classesHandler(io, socket)
})

httpServer.listen( 8000, 'localhost', () => {
    console.log('Server listening at port 8000')
    
})

