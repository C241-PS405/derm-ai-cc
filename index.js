const express = require("express");
const cors = require("cors");
const model = require('./model.js');
const clienterror = require("./clienterror.js");

const app = express();

let isModelInitialize = false;
let modelTensor;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Server berjalan pada port 8000
const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    console.log("Server Berjalan " + PORT)
    modelTensor = await model.loadModel();
})
app.get('/', async (req,res) => {
    res.send("Hello World")
});

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
app.post("/api/scan", async (req,res) => {
  try {
  let analyze = await model.analyzeclassification(
    modelTensor,
    req.files.image.data
  );
  res.status(201).json({
    status: "Sukses",
    data: analyze,
  })
  } catch (error) {
    res.status(error.statusCode).json({
      status: "Gagal",
      message: error.message,
    })
  }
})
