var express = require("express");
var router = express.Router();
// var middleware = require("../middleware");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//root route
router.get("/", function(req, res){
    res.render("index");
});

module.exports = router;