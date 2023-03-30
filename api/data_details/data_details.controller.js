const models = require('./../../models/index')
const details = models.data_details

module.exports = {
    controllerGetDetails: (req, res)=> {
        details.findAll({
            where: {
                id_kasir: req.params.id_kasir
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: models.menu,
                as: "data_menu",
                attributes: {
                    exclude: ["createdAt", 'updatedAt']
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
    controllerAddDetails: async (req, res)=> {
        const {
            id_kasir, id_menu, total_barang
        }= req.body

        const getPrice = await models.menu.findOne({
            where: {
              id: id_menu
            }
          });
        
        const data = {
            id_kasir: id_kasir,
            id_menu: id_menu,
            total_harga: getPrice.harga * total_barang,
            total_barang:total_barang
        }
        details.create(data)
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerEditDetails: async(req, res)=> {
        const {
            id_menu, total_barang
        }= req.body
        
        const getPrice = await models.menu.findOne({
            where: {
              id: id_menu
            }
          });
        
        const data = {
            id_menu: id_menu,
            total_harga: getPrice.harga * total_barang,
            total_barang:total_barang
        }
        details.update(data, {
            where: {
                id: req.params.id
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
    controller1DelDetails: (req, res)=> {
        details.destroy({
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
    controllerAllDelDetails: (req, res)=> {
        details.destroy({
            where: {
                id_kasir: req.params.id_kasir
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