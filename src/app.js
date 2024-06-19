const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const model = require("./model.js");
const PORT = process.env.PORT;

const app = express();

let isModelInitialize = false;
let modelTensor;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});

const router = require("./routes/index");
app.use(router);

// untuk mendapatkan hasil dari scan
app.get("/api/hasil", async (req, res) => {
  model.getscan().then((data) => {
    res.json({
      status: "success",
      data,
    });
  });
});

// untuk melakukan scan
app.post("/api/scan", async (req, res) => {
  try {
    let analyze = await model.analyzeclassification(
      modelTensor,
      req.files.image.data
    );
    res.status(201).json({
      status: "Sukses",
      data: analyze,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "Gagal",
      message: error.message,
    });
  }
});
