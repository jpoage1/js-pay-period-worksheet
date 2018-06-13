//const pool = require("./Components/pool")
const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const session = require("./Components/Session");
app.get('/Api/Authentication/Session', session);

const login = require("./Components/Login");
app.post('/Api/Authentication/Login', login);

const logout = require("./Components/Logout");
app.get('/Api/Authentication/Logout', logout);

const districts = require("./Components/Districts");
app.get('/Api/Districts', districts);

const district = require("./Components/District");
app.get('/Api/District/:district_id', district);

const regions = require("./Components/Regions");
app.get('/Api/Regions', regions);

const region = require("./Components/Region");
app.get('/Api/Regions/:region_id', region);

const salons = require("./Components/Salons");
app.get('/Api/Salons', salons);

const salon = require("./Components/Salon");
app.get('/Api/Salons/:salon_id', salon);

const stylists = require("./Components/Stylists");
app.get('/Api/Stylists', stylists);

const stylist = require("./Components/Stylist");
app.get('/Api/Stylists/:stylist_id', stylist);

const payPeriods = require("./Components/PayPeriods");
app.get('/Api/PayPeriods', payPeriods);

const payPeriod = require("./Components/PayPeriod");
app.get('/Api/PayPeriods/:pp_id', payPeriod);

const worksheet = require("./Components/Worksheet");
app.get('/Api/Worksheet', worksheet);

// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));