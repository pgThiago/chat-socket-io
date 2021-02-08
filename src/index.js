const PORT = process.env.PORT || 3333
const express = require('express')
const path = require('path')
const socketIo = require('socket.io')

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))

// Para o código com salas ================================================
// app.use('/group1', express.static(path.join(__dirname, 'public')))
// app.use('/group2', express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

const messages = []

// const messages = { group1: [], group2: [] } // Para o código com salas

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('new connection')
    socket.emit('update_messages', messages)
    socket.on('new_message', (data) => {
        messages.push(data)
        io.emit('update_messages', messages)
    })
})

// Com salas =====================================================

// const group1 = io.of('/group1').on('connection', (socket) => {
//     console.log('new connection')
//     socket.emit('update_messages', messages.group1)
//     socket.on('new_message', (data) => {
//         messages.group1.push(data)
//         group1.emit('update_messages', messages.group1)
//     })
//     console.log(messages)
// })

// const group2 = io.of('/group2').on('connection', (socket) => {
//     console.log('new connection')
//     socket.emit('update_messages', messages.group2)
//     socket.on('new_message', (data) => {
//         messages.group2.push(data)
//         group2.emit('update_messages', messages.group2)
//     })
// })