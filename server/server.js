const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");

const app = express();
app.use(bodyParser.json());

// MongoDB connection without deprecated options
mongoose
  .connect("mongodb+srv://simamkele:TTZtcWikjcTKAYlm@eco-market.h7p8h.mongodb.net/eco_market_db")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", apiRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
