var express=require("express");
var app=express();
var bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    flash=require("connect-flash"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride = require("method-override"),
    User=require("./models/user");
//    seedDB=require("./seeds");
    
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index");
    
//seedDB();



//mongoose.connect("mongodb://localhost/yelp_camp_v2");
mongoose.connect("mongodb://momo:123456@ds255787.mlab.com:55787/yelpcampofmomo")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"momo",
    resave:false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("error");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(commentRoutes);


app.listen(8080, process.env.IP, function(){
    console.log("listen!!");
});
