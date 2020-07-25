const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

//routes
const authRoute = require("./routes/auth");
const listRoute = require("./routes/list");
const mailRoute = require('./routes/mail')

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", listRoute);
app.use("/api/user", authRoute);
app.use('/api/data', mailRoute)

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000);
