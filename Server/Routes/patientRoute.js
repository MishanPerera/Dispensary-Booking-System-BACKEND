const express = require("express");

const router = express.Router();
const {
  upload,
  createPatient,
  loginPatient,
} = require("../Controllers/patientController");

router.post("/", upload.single("image"), createPatient);
router.post("/login", loginPatient);

module.exports = router;
