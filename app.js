require("dotenv").config();
const express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    methodOverride = require("method-override");

//requiring routes    
var indexRoutes      = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require('moment');

app.use("/", indexRoutes);


app.listen(process.env.PORT, () => {
	console.log('server is listening on port 3000');
});