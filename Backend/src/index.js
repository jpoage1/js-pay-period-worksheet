//const pool = require("./Components/pool")
const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
[
	['./Components/Session','/Api/Authentication/Session'],
	['./Components/Login','/Api/Authentication/Login'],
	['./Components/Logout','/Api/Authentication/Logout'],
	['./Components/Districts/Districts', '/Api/Districts'],
	['./Components/Districts/District','/Api/District/:district_id'],
	['./Components/Regions/Regions','/Api/Regions'],
	['./Components/Regions/Region','/Api/Regions/:region_id'],
	['./Components/Salons/Salons','/Api/Salons'],
	['./Components/Salons/Salon','/Api/Salons/:salon_id'],
	['./Components/Stylists/Stylists','/Api/Stylists'],
	['./Components/Stylists/Stylist','/Api/Stylists/:stylist_id'],
	['./Components/PayPeriods/PayPeriods','/Api/PayPeriods'],
	['./Components/PayPeriods/PayPeriod','/Api/PayPeriods/:pp_id'],
	['./Components/Worksheet','/Api/Worksheet/:wsName'],
]
.forEach( (route) => {
	//console.log(route[0])
	const module = require(route[0]);
	app.get(route[1], module);
});
// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));