const Students = require('../models').students
const db = require('../models')


exports.getAllStudents = async (req, res, next) => {
    try {
        let students;
        if (req.query.card) {
            students = await Students.findAll({
                include: db.classes,
                where: {
                    CardId: req.query.card
                }
            })
        } else {
            students = await Students.findAll({
                include: db.classes
            })
        }
        res.status(200).send(students)
    } catch (error) {
        
    }
}

exports.getStudentById = async (req, res, next) => {
    try {
        const student = await Students.findOne({
            where: { id: req.params.id },
            include: db.classes
        })

        if (!student) {
            return res.status(404).send('Student not found')
        }

        res.status(200).send(student)

    } catch (error) {
        console.log(error)
    }
}

exports.createStudent = async (req, res, next) => {
    try {
        
        const newStudent = await Students.create({
            name: req.body.name,
            ClassId: req.body.ClassId,
            CardId: req.body.CardId
        })
        res.status(200).send(newStudent)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'error'
        })
    }
}

