const Classes = require('../models').classes


exports.getAllClasses = async (req, res, next) => {
    try {
        const classes = await Classes.findAll()
        res.status(200).send(classes)
    } catch (error) {
        
    }
}

exports.getClassById = async (req, res, next) => {
    try {
        const foundClass = await Classes.findOne({
            where: { id: req.params.id }
        })

        if (!foundClass) {
            return res.status(404).send('Class not found')
        }

        res.status(200).send(foundClass)

    } catch (error) {
        console.log(error)
    }
}

exports.createClass = async (req, res, next) => {
    try {
        
        const newClass = await Classes.create({
            name: req.body.name
        })
        res.status(200).send(newClass)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'error'
        })
    }
}

