var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");


//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sing up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
            req.flash("success", "Wellcome to YelpCamp " + user.username);           
            res.redirect("/campgrounds");   
       });
   });
});

//Show login form
router.get("/login", function(req,res){
    res.render("login");
});

//Handling Login Logic
//app.post("/login", middleware, callback);
router.post("/login", passport.authenticate("local",
        {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
            }), function(req, res, err) {
            req.flash("error", err.message);   
});

//Logout logic route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!")
   res.redirect("/campgrounds");
});


module.exports  = router;