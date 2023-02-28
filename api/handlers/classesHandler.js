const Students = require('../models').students
const axios = require('axios')

const twilioClient = require('twilio')('ACc4486349b4f73e774ec3a4a4ea6656f0', '179203c3d4c2043ef901bf64633b7450')

module.exports = (io, socket) => {
    const joinClass = (classId) => {
        const rooms = [...socket.rooms].splice(1, 1)
        io.socketsLeave(rooms)

        socket.join(classId)
        console.log(socket.rooms)
    }

    const call = async (cardId) => {
        try {
            // get all students where card id = cardId
            const students = await Students.findAll({
                where: {
                    CardId: cardId
                }
            })

            students.forEach(async s => {
                io.to(s.ClassId).emit('call', s)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const send = async (student) => {
        try {
            io.emit('send', student)
            twilioClient.messages.create({
                body: `Your child, ${student.name}, is on the way`,
                from: '+19856025887',
                to: '+97477317969'
            })
        } catch (error) {
            console.log(error)
        }
    }

    socket.on('class:join', joinClass)
    socket.on('call', call)
    socket.on('send' ,send)
}