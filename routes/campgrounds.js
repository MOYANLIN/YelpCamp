var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware = require("../middleware");



router.get("/", function(req, res){
    //get all from db
    Campground.find({}, function(err, allCampgrounds){
        if(err) console.log(err);
        else res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var desc=req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground={name:name, image: image, price: price, description: desc,author: author};
    Campground.create(newCampground,function(err, campground){
    if(err){console.log(err);}
    else res.redirect("/campgrounds");
});
});

router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err) console.log(err);
        else {
            console.log(foundCamp);
            res.render("campgrounds/show", {campgrounds:foundCamp});
        }
    });
});

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    
        Campground.findById(req.params.id, function(err, foundCamp){
        if(err) console.log(err);
        else{
            res.render("campgrounds/edit", {campground: foundCamp});
            }
    });
});

//update
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err) console.log(err);
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) console.log(err);
        else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports=router;