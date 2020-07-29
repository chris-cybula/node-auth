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
const settingsRoute = require('./routes/settings')

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", listRoute);
app.use("/api/user", authRoute);
app.use('/api/mail', mailRoute)
app.use('/api/settings', settingsRoute)

// connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000);
