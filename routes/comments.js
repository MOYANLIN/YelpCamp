var express=require("express");
var router=express.Router({mergeParams:true});
var  Campground=require("../models/campground");
var  Comment=require("../models/comment");
var middleware = require("../middleware");



router.get("/campgrounds/:id/comment/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else res.render("comments/new", {campground:campground});
    });
});

router.post("/campgrounds/:id/comment",middleware.isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) console.log(err);
                else {
                    
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment._id);
                    campground.save();
                    
                    req.flash("success", "Successfully add comment!")
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//delete
router.delete("/campgrounds/:id/comment/:comment_id", middleware.checkCommentOwnership,function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err) res.redirect("back");
       else{
           req.flash("success", "Comment deleted.")
           return res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports=router;