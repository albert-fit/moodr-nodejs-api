const express = require("express");
const cors = require("cors");

require('dotenv').config();
console.log('test')
const app = express();

var corsOptions = {
  origin:process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to moodr" });
});

// routes
require("./app/routes/photo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT_SERVER;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
