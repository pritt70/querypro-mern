const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const enquiryRoutes = require("./App/routes/web/enquiryRoutes");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

// CALLING ROUTES
app.use("/api/enquiry",enquiryRoutes);



// CONNECT TO MONGO-DB
const PORT = process.env.PORT || 9191;

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED");
    app.listen(PORT, () => {
      console.log(`APPLICATION STARTED ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
