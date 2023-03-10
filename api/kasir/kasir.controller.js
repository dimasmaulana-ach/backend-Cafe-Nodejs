const models = require('./../../models/index')
const kasir = models.kasir

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    controllerGetKasir: (req, res)=> {
        kasir.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            include: {
                model: models.role,
                as: "roles",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                }
            }
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerGetKasirById: (req, res)=> {
        kasir.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            include: {
                model: models.role,
                as: "roles",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                }
            }
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerAddKasir: async(req, res)=> {
        const {password} = req.body
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(password, salt)
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
            role: req.body.role
        }
        kasir.create(data)
        .then(result=> {
            res.json({
                data : req.body
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerUpdateKasir: async(req, res)=> {
        const {password} = req.body
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(password, salt)
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
            role: req.body.role
        }
        kasir.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                data: req.body
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerDeleteKasir: (req, res)=> {
        kasir.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                message: "data was deleted"
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerLoginKasir: async(req, res)=> {
        try {
            const kasirs = await kasir.findOne({
                where: {
                    username: req.body.username
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            const match = await bcrypt.compare(kasirs.password, req.body.password)
            if(!match) return res.status(400).json({message: "wrong password"})

            const kasirname = kasirs.name
            const kasiruname = kasirs.username

            const signs = jwt.sign({kasirname, kasiruname}, process.env.TOKEN)
            
            res.json({
                data: kasirs,
                token: signs
            })
        } catch (error) {
            res.status(404).json({
                message: "username not found"
            })
        }
    }
}