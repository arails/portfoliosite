require("dotenv").config();
const express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    cookieParser  = require("cookie-parser"),
    flash         = require("connect-flash"),
	passport      = require("passport"),
    methodOverride = require("method-override");

//requiring routes    
var indexRoutes      = require("./routes/index");

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


app.locals.moment = require('moment');

//COOKIE CONFIGURATION
app.use(cookieParser());
app.use(require("express-session")({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);


app.listen(process.env.PORT, () => {
	console.log('Server started...');
});