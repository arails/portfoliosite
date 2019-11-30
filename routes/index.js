var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//root route
router.get("/", function(req, res){
    res.render("index");
});

router.post("/send", function(req, res) {
      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.zoho.com',
		port: 465,
		secure: true, //use SSL
        auth: {
          user: 'arails.development@zohomail.com',
          pass: process.env.ZOHOPW
		}
	  });
	
	var mailOptions = {
        to: req.body.email,
        from: 'arails.development@zohomail.com',
        subject: 'Next Step',
        text: 'Hello, \n\n' +
		  'Thank you for visiting my portfolio site and expressing an interest in my work.\n\n' +
          'Please respond to this e-mail with more information about the opportunity you have for me, and I will get back to you as soon as possible.\n\n' +
		  'I look forward to communicating with you more in the near future! \n\n' +
		  'Sincerely \n\n' +
		  'Andrew Rails\n\n' +
          'Note: If you did not request this email, please feel free to ignore or delete. Sorry for the inconvenience.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Huzzah! An e-mail will be sent to ' + req.body.email + ' . Please check your spam folder if you don\'t see it in your inbox.' );
        if (err){
			console.log(err);
			req.flash('error', 'Uh-oh, something went wrong...' );
			return res.redirect("/");
		} 
		console.log('mail sent');
		res.redirect("/");
      });
});

module.exports = router;