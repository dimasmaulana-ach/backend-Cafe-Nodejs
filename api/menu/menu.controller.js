const models = require("./../../models/index");
const menu = models.menu;

const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.png`);
  }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  menu
    .findAll({
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
    })
    .then(result => {
      res.json({
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/:id", (req, res) => {
  menu
    .findOne({
      where: {
        id: req.params.id
      },
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
    })
    .then(result => {
      res.json({
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      harga: req.body.harga
    };

    menu
      .create(data)
      .then(result => {
        res.json({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      harga: req.body.harga
    };

    menu
      .create(data)
      .then(result => {
        res.json({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.put("/:id", upload.single("image"), async (req, res) => {
  if (req.file) {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      harga: req.body.harga
    };

    let results = await menu.findOne({
      where: { id: req.params.id }
    });
    let oldFileName = results.image;

    let dir = path.join(__dirname, "../../image/", oldFileName);
    fs.unlink(dir, err => {
      console.log(err);
    });

    menu
      .update(data, {
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.json({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      harga: req.body.harga
    };

    menu
      .update(data, {
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.json({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let results = await menu.findOne({
      where: { id: req.params.id }
    });
    let oldFileName = results.image;

    let dir = path.join(__dirname, "../../image/", oldFileName);
    fs.unlink(dir, err => {
      console.log(err);
    });

    menu
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.json({
          message: "data was deleted"
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    menu
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.json({
          message: "data was deleted"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.get("/image/:image", (req, res) => {
  let { image } = req.params;
  fs.readFile(`./image/${image}`, (err, data) => {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(data);
  });
});

module.exports = app;
