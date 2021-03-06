var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");
}

router.get("/", function(req, res){
    res.render("landing");
});



//AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser= new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
        
        
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    
}),function(req, res) {

});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully log out");
    return res.redirect("/campgrounds");
});

module.exports=router;