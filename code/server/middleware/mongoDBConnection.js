const mongoose = require("mongoose");
require("dotenv").config();
//mongodb connection setup
const conn=mongoose
  .connect("mongodb://127.0.0.1/med_guard", { useNewURLParser: true, useUnifiedTopology: true })
  .catch((err) => console.error(err));