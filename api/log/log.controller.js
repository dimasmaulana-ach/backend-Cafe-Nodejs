const models = require("./../../models/index");
const logs = models.log;

module.exports = {
  controllerGetLog: (req, res)=> {
    logs.findAll({
      attributes: {
        exclude: ['updatedAt']
      },
      include: {
        model: models.kasir,
        as: "logs",
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        },
        include: {
          model: models.role,
          as: "roles",
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
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
  controllerLogOut: (req, res) => {
    const data = {
      id_kasir: req.params.id,
      status: "log out"
    };
    logs
      .create(data)
      .then(result => {
        res.json({ message: "log out" });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
