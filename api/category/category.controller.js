const models = require('./../../models/index')
const category = models.category_menu

module.exports = {
    controllerGetCategory: (req, res)=> {
        category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
    controllerGetCategoryById: (req, res)=> {
        category.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
    controllerAddCategory: (req, res)=>{
        const data = {
            name: req.body.name
        }
        category.create(data)
        .then(result=> {
            res.json({
                data: req.body
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerUpdateCategory: (req, res)=> {
        const data = {
            name: req.body.name
        }
        category.update(data, {
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
    controllerDeleteCategory: (req, res)=> {
        category.destroy({
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