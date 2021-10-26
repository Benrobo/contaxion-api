require("dotenv").config()
const express = require('express');
const cors = require("cors")
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/", require("./routes/index"))
app.use("/api/sendMail", require("./routes/sendMail"))


const port = process.env.PORT || 5000;

app.listen(port)
