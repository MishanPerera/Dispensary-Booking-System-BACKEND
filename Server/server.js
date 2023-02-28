const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const connection = require("./DB");

//import routers by creating constant variables
const patientRouter = require("./Routes/patientRoute");

// database connection
connection();

// middlewares

app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api/patient", patientRouter);

const port = process.env.PORT || 8001;

app.listen(port, (err) => {
  if (err) console.log("Error Ocuured in Starting the Server:", err);
  console.log(`Despensary Booking Server is Listening on Port ${port}...`);
});
