const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const ideaRoute = require("./routes/ideaRoute");
const kijijiRoute = require("./routes/kijijiRoute");

dotenv.config();

const PORT = process.env.PORT || 8080;

// Using CORS to bypass security measures
app.use(cors());
app.use(express.json());

// Using the Routes
app.use("/idea", ideaRoute)
app.use("/kijiji", kijijiRoute)

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT,
  error => error
  ? console.log(error)
  : console.info(`Running on ${PORT}`)
)