const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const connection = require("./DB");

//import routers by creating constant variables
const patientRouter = require("./Routes/patientRoute");
// const stockRouter = require("./Routes/stockRoutes");
// const facilityRouter = require("./Routes/serviceFacilityRoutes");
// const serviceRouter = require("./Routes/serviceRoutes");
// const customerRouter = require("./Routes/customerRoutes");
// const paymentRouter = require("./Routes/paymentRoutes");

// database connection
connection();

// middlewares
// app.use(express.json());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/patient", patientRouter);
// app.use("/api/stock", stockRouter);
// app.use("/api/facility", facilityRouter);
// app.use("/api/service", serviceRouter);
// app.use("/api/customer", customerRouter);
// app.use("/api/payment", paymentRouter);

const port = process.env.PORT || 8001;

app.listen(port, (err) => {
    if (err) console.log("Error Ocuured in Starting the Server:", err);
    console.log(`Despensary Booking Server is Listening on Port ${port}...`);
});
