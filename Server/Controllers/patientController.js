const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const multar = require("multer");
const path = require("path");

//import mongoose model
const Patient = require("../Models/patientModel");

//image storage
const storage = multar.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"), function (error, success) {
      if (error) throw error;
    });
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});

//image upload
const upload = multar({ storage: storage });

// Create a New Patient Profile
const createPatient = asyncHandler(async (req, res) => {
  const { firstName, lastName, mobileNo, email, password } = req.body;

  if (!firstName || !lastName || !mobileNo || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Required Fields");
  }

  // Check if user alredy exists with provided email
  const userExists = await Patient.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This Email Address is Already Being Used");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Patient Profile
  const patient = await Patient.create({
    firstName,
    lastName,
    mobileNo,
    image: req.file.filename,
    email,
    password: hashedPassword,
  });

  if (patient) {
    res.status(201);
    res.json("Patient Added to the System Successfully!");
  } else {
    res.status(400);
    throw new Error("Invalid User! Please Check Again...");
  }
});

//Patient login
const loginPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check details to fetch user email
  const patient = await Patient.findOne({ email });

  if (patient && (await bcrypt.compare(password, patient.password))) {
    res.json({
      _id: patient.id,
      firstname: patient.firstName,
      lastName: patient.lastName,
      mobileNo: patient.mobileNo,
      image: patient.image,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  upload,
  createPatient,
  loginPatient,
};
