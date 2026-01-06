

const express = require("express");
const cors = require("cors");

const classifyRoutes = require("./routes/classify.routes");

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api", classifyRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

module.exports = app;
