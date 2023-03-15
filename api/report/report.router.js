const express = require("express");
const router = express.Router();

const {
  controllerGetReport,
  controllerGetReportById,
  controllerAddReport,
  controllerEditReport,
  controllerDeleteReport
} = require("./report.controller");

router.get("/", controllerGetReport);
router.get("/:id", controllerGetReportById);
router.post("/", controllerAddReport);
router.put("/:id", controllerEditReport);
router.delete("/:id", controllerDeleteReport);

module.exports = router;
