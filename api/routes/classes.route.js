const {createClass, getAllClasses, getClassById} = require('../controllers/classes.controller')
const router = require('express').Router()

module.exports = (app) => {
    
    router.get('/' ,getAllClasses)
    router.get('/:id' ,getClassById)
    router.post('/', createClass)
    app.use('/classes' ,router)
}