const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const homeRoute = require("./Routes/homeRoute");

require("./db/Config");

const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "*");

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined")); 

app.use("/uploads/", express.static("public"));


app.use("/api/v1", homeRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
