const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const propertyRoutes = require("./routes/propertyRoutes");
const propertyRentRoutes = require("./routes/propertyRentRoutes");
const propertyPgRoutes = require("./routes/propertyPgRoutes");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://parth5502:o1Ro6gHVXbW1qTYz@parthcluster-nsxfj.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/images');
app.use(express.static(publicDir))

console.log(publicDir);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/propertyRoutes", propertyRoutes);
app.use("/api/propertyRentRoutes", propertyRentRoutes);
app.use("/api/propertyPgRoutes", propertyPgRoutes);
app.use("/api/user", userRoutes);




module.exports = app;
