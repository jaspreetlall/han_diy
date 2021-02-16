const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const ideaRoute = require("./routes/ideaRoute");
const kijijiRoute = require("./routes/kijijiRoute");

dotenv.config();

// Using CORS to bypass security measures
app.use(cors());
app.use(express.json());

// Serving images from images directory
app.use('/images', express.static('images'));

// Using the Routes
app.use("/idea", ideaRoute)
app.use("/kijiji", kijijiRoute)

app.listen(process.env.PORT,
  error => error
  ? console.log(error)
  : console.info(`Running on ${process.env.PORT}`)
)