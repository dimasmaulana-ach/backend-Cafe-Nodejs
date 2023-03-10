const models = require("./../../models/index");
const meja = models.meja;

module.exports = {
  controllerGetMeja: (req, res) => {
    meja
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      })
      .then(result => {
        res.json({
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerGetMejaById: (req, res) => {
    meja
      .findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      })
      .then(result => {
        res.json({
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerAddMeja: (req, res) => {
    const data = {
      nomor_meja: req.body.nomor_meja,
    };

    meja
      .create(data)
      .then(result => {
        res.json({
          data: req.body,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerUpdateMeja: (req, res) => {
    const data = {
      nomor_meja: req.body.nomor_meja,
    };
    meja
      .update(data, {
        where: {
          id: req.params.id,
        },
      })
      .then(result => {
        res.json({
          data: req.body,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  controllerDeleteMeja: (req, res) => {
    meja
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(result => {
        res.json({
          message: "data was deleted",
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
};
