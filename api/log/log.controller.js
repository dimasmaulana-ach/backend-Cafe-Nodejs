const models = require("./../../models/index");
const logs = models.log;

module.exports = {
  controllerLogOut: (req, res) => {
    const data = {
      id_kasir: req.body.id_kasir,
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
