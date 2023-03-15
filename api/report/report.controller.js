const models = require('./../../models/index')
const report = models.bug_report

module.exports = {
    controllerGetReport: (req, res)=> {
        report.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: models.kasir,
                as: "reports",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
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
    controllerGetReportById: (req, res)=> {
        report.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: models.kasir,
                as: "reports",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
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
    controllerAddReport: (req, res)=> {
        const {id_kasir, message} = req.body
        const data = {
            tgl_report : new Date().toJSON(),
            id_kasir: id_kasir,
            message: message
        }
        report.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerEditReport: (req, res)=> {
        const {id_kasir, message} = req.body
        const data = {
            tgl_report : new Date().toJSON(),
            id_kasir: id_kasir,
            message: message
        }
        report.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerDeleteReport: (req, res)=> {
        report.destroy({
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
    }
}