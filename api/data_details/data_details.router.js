const express = require("express");
const {
  controllerGetDetails,
  controllerAddDetails,
  controllerEditDetails,
  controller1DelDetails,
  controllerAllDelDetails
} = require("./data_details.controller");
const router = express.Router();

router.get("/:id_kasir", controllerGetDetails);
router.post("/", controllerAddDetails);
router.put("/:id", controllerEditDetails);
router.delete("/:id", controller1DelDetails);
router.delete("/all/:id_kasir", controllerAllDelDetails);

module.exports = router;
