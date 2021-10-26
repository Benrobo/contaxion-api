const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// import services
const sendMail = require("../services/sendMail")

/* GET users listing. */
router.post('/', async (req, res)=> {
  return await sendMail(req, res)
});

module.exports = router;
