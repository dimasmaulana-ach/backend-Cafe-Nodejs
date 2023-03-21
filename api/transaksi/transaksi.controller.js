const models = require("./../../models/index");
const transaksi = models.transaksi;

const { v4: uuidv4 } = require("uuid");

module.exports = {
  controllerGetTransaksi: (req, res) => {
    transaksi
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: models.kasir,
            as: "kasirs",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: {
              model: models.role,
              as: "roles",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          },
          {
            model: models.meja,
            as: "meja_pelanggan",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          },
          {
            model: models.detail_transaksi,
            as: "detail_transaksi",
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
          }
        ]
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
  controllerGetTransaksiById: (req, res) => {
    transaksi
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: models.kasir,
            as: "kasirs",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: {
              model: models.role,
              as: "roles",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          },
          {
            model: models.meja,
            as: "meja_pelanggan",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          },
          {
            model: models.detail_transaksi,
            as: "detail_transaksi",
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
          }
        ]
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
  controllerAddTransaksi: (req, res) => {
    let uuid = uuidv4();
    let data = {
      id: uuid,
      tgl_transaksi: new Date().toJSON(),
      id_kasir: req.body.id_kasir,
      id_meja: req.body.id_meja,
      nama_pelanggan: req.body.nama_pelanggan,
      status: "success",
      metode_pembayaran: req.body.metode_pembayaran
    };
    transaksi
      .create(data)
      .then(result => {
        res.json({
          data: req.body
        });
        try {
          req.body.details.forEach(async d => {
            let getPrice = await models.menu.findOne({
              where: {
                id: d.id_menu
              }
            });
            let datas = {
              id_transaksi: result.id,
              id_menu: d.id_menu,
              harga: getPrice.harga,
              total_harga: getPrice.harga * d.total_barang,
              total_barang: d.total_barang
            };

            models.detail_transaksi
              .create(datas)
              .then(results => {
                res.status(200).end();
              })
              .catch(err => {
                console.log(err);
              });
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerDeteleTransaksi: (req, res) => {
    transaksi
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        models.detail_transaksi
          .destroy({
            where: {
              id_transaksi: req.params.id
            }
          })
          .then(result => {
            transaksi
              .destroy({
                where: {
                  id: req.params.id
                }
              })
              .then(results => {
                res.json({
                  message: "data was deleted"
                });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
