const models = require("./../../models/index");
const logs = models.log;

module.exports = {
  controllerGetLog: (req, res)=> {
    logs.findAll({
      attributes: {
        exclude: ['updatedAt']
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
      kasir: req.body.kasir,
      status: "log out",
      role: req.body.role
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
