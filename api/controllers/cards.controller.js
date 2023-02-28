const Cards = require('../models').cards


exports.getAllCards = async (req, res, next) => {
    try {
        const cards = await Cards.findAll()
        res.status(200).send(cards)
    } catch (error) {
        
    }
}

exports.getCardById = async (req, res, next) => {
    try {
        const card = await Cards.findOne({
            where: { id: req.params.id }
        })

        if (!card) {
            return res.status(404).send('Card not found')
        }

        res.status(200).send(card)

    } catch (error) {
        console.log(error)
    }
}

exports.createCard = async (req, res, next) => {
    try {
        const newCard = await Cards.create({
            NFC_code: req.body.NFC_code
        })
        res.status(200).send(newCard)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'error'
        })
    }
}

