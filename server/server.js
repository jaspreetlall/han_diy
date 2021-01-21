const { response } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const ideaRoute = require("./routes/ideaRoute");

dotenv.config();

// Using CORS to bypass security measures
app.use(cors());

// Using the Routes
app.use("/idea", ideaRoute)

app.listen(process.env.PORT,
  error => error
  ? console.log(error)
  : console.info(`Running on ${process.env.PORT}`)
)