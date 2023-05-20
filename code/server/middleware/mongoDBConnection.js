const mongoose = require("mongoose");
require("dotenv").config();

const conn=mongoose
  .connect(process.env.ConnectionString, { useNewURLParser: true, useUnifiedTopology: true })
  .catch((err) => console.error(err));