require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log("Database Connection Failed", e));

const app = express();
app.use(express.json());
app.listen(8000, () => console.log("Server started at 8000"));
