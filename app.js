const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv/config");

const app = express();

//routes
const authRoute = require("./routes/auth");
const listRoute = require("./routes/list");
const mailRoute = require('./routes/mail')
const settingsRoute = require('./routes/settings')

//middlewares

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

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
