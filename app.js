const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv/config");

const app = express();

const authRoute = require("./routes/auth");
const listRoute = require("./routes/list");
const mailRoute = require('./routes/mail')
const settingsRoute = require('./routes/settings')

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", listRoute);
app.use("/api/user", authRoute);
app.use('/api/mail', mailRoute)
app.use('/api/settings', settingsRoute)

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000);
