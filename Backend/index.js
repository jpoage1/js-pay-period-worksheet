//const pool = require("./Components/pool")
const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

session = require("./Components/Session");
app.get('/Api/Authentication/Session', session);

login = require("./Components/Login");
app.post('/Api/Authentication/Login', login);

logout = require("./Components/Logout");
app.get('/Api/Authentication/Logout', logout);

stylists = require("./Components/Stylists");
app.get('/Api/Stylists', stylists);

stylist = require("./Components/Stylist");
app.get('/Api/Stylists/:id', stylist);

payPeriods = require("./Components/PayPeriods");
app.get('/Api/PayPeriods', payPeriods);

payPeriod = require("./Components/PayPeriod");
app.get('/Api/PayPeriods/:id', payPeriod);

worksheet = require("./Components/Session");
app.get('/Api/Worksheet', worksheet);/**/

// Start listening
const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Listening on port ${port}`));