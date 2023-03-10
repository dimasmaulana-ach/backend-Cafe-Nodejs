const models = require("./../../models/index");
const details = models.detail_transaksi;

const { v4: uuidv4 } = require("uuid");

module.exports = {
  controllerGetDetails: (req, res) => {
    details
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: {
          model: models.menu,
          as: "details_menu",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: {
            model: models.category_menu,
            as: "categorys",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        }
      })
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerGetDetailsById: (req, res) => {
    details
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: {
          model: models.menu,
          as: "details_menu",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: {
            model: models.category_menu,
            as: "categorys",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        }
      })
      .then(result => {
        res.json({
          data: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerAddDetails: async (req, res) => {
    const id = uuidv4();
    const getPrice = await models.menu.findOne({
      where: {
        id: req.body.id_menu
      }
    });
    const data = {
      id: id,
      id_transaksi: req.body.id_transaksi,
      id_menu: req.body.id_menu,
      harga: getPrice.harga,
      total_harga: getPrice.harga * req.body.total_barang,
      total_barang: req.body.total_barang
    };

    details
      .create(data)
      .then(result => {
        res.json({
          data: req.body
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerEditDetails: async (req, res) => {
    try {
      const getStatus = await models.transaksi.findOne({
        where: {
          id: req.body.transaksi_id
        }
      });
      if (getStatus.status === "on process" || getStatus.status === "success") {
        res.json({
          message: "data cannot updated"
        });
      } else {
        const getPrice = await models.menu.findOne({
          where: {
            id: req.body.id_menu
          }
        });
        const data = {
          id_transaksi: req.body.id_transaksi,
          id_menu: req.body.id_menu,
          harga: getPrice.harga,
          total_harga: getPrice.harga * req.body.total_barang,
          total_barang: req.body.total_barang
        };

        details
          .updated(data, {
            where: {
              id: req.params.id
            }
          })
          .then(result => {
            res.json({
              data: req.body
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  controllerDeleteDetails: async (req, res) => {
    details
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(async result => {
        try {
          const getStatus = await models.transaksi.findOne({
            where: {
              id_transaksi: result.id_transaksi
            }
          });
          if (
            getStatus.status === "on process" ||
            getStatus.status === "success"
          ) {
            res.json({
              message: "data cannot deleted"
            });
          } else {
            details.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(results=> {
                res.json({
                    message: "data was deleted"
                })
            })
            .catch(err=> {
                console.log(err)
            })
          }
        } catch (error) {
            console.log(error)
        }
      })
      .catch(err=> {
        console.log(err)
      })
  }
};
