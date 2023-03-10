const models = require("./../../models/index");
const menu = models.menu;

const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  menu
    .findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: models.category_menu, 
        as: 'categorys',
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
      }
    })
    .then(result => {
      res.json({
        data: result,
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
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: models.category_menu, 
        as: 'categorys',
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
      }
    })
    .then(result => {
      res.json({
        data: result,
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/", upload.single("gambar"), (req, res) => {
  if (req.file) {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      gambar: req.file.filename,
      harga: req.body.harga,
    };

    menu
      .create(data)
      .then(result => {
        res.json({
          data: req.body,
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
      harga: req.body.harga,
    };

    menu
      .create(data)
      .then(result => {
        res.json({
          data: req.body,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

app.put("/:id", upload.single("gambar"), async (req, res) => {
  if (req.file) {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      gambar: req.file.filename,
      harga: req.body.harga,
    };

    let results = await menu.findOne({
      where: { id: req.params.id },
    });
    let oldFileName = results.image;

    let dir = path.join(__dirname, "../../image/", oldFileName);
    fs.unlink(dir, err => {
      console.log(err);
    });

    menu
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
  } else {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      harga: req.body.harga,
    };

    menu
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
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let results = await menu.findOne({
      where: { id: req.params.id },
    });
    let oldFileName = results.image;

    let dir = path.join(__dirname, "../../image/", oldFileName);
    fs.unlink(dir, err => {
      console.log(err);
    });

    menu
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
  } catch (error) {
    console.log(err);
  }
});


app.get('/image/:gambar', (req, res)=> {
    let {gambar} = req.params
    fs.readFile(`./image/${gambar}`, (err, data)=> {
        res.writeHead(200, {
            'Content-Type': 'image/png'
        })
        res.end(data)
    })
})

module.exports = app