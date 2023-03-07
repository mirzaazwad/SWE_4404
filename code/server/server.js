const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const signUpRoutes = require("./routes/loginSignUp/signUpRoutes");
const loginRoutes = require("./routes/loginSignUp/loginRoutes");
const app=express();
const dbURI = process.env.ConnectionString;
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.use("/api/signup", signUpRoutes);
app.use("/api/login", loginRoutes);
