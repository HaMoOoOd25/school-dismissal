const { getAllStudents, getStudentById, createStudent } = require('../controllers/students.controller')

const router = require('express').Router()

module.exports = (app) => {
    
    router.get('/' ,getAllStudents)
    router.get('/:id' ,getStudentById)
    router.post('/', createStudent)
    app.use('/students' ,router)
}