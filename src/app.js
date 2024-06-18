const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});

const router = require("./routes/index");
app.use(router);
