const { getAllCards, getCardById, createCard } = require('../controllers/cards.controller')

const router = require('express').Router()

module.exports = (app) => {
    
    router.get('/' ,getAllCards)
    router.get('/:id' ,getCardById)
    router.post('/', createCard)
    app.use('/cards' ,router)
}