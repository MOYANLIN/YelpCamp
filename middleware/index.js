var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership=function(req, res, next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
        if(err) {
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        else{
            if(foundCamp.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("error", "You don't have the permission.");
                return res.redirect("back");
            }
             
        }
    });
    }
    else{
         req.flash("error", "Please Logged In First!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership=function(req, res, next){
     if(req.isAuthenticated())
     {
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) console.log(err);
        else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back");
            }
             
        }
    });
    }
    else{
        res.redirect("back");
    }
};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash("error", "Please Logged In First!");
    res.redirect("/login");
};


module.exports = middlewareObj;