var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[{
     name:"Cougar Rock", 
     image:"https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg",
     description:"Very good!",
     
},
{
     name:"Paradise", 
     image:"https://i.pinimg.com/originals/2e/b7/e2/2eb7e206036f11c94ed0cac8fb1fc05e.jpg",
     description:"Very good!",
     
},
{
     name:"Goose Lake", 
     image:"https://woodlands.ab.ca/wp-content/uploads/2016/03/Goose-Lake-Campground.jpg",
     description:"Very good!",
     
}
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
//         if(err)
//         console.log(err);
//         else{
//             console.log("remove db");
//     //add new campgrounds
//     data.forEach(function(seed){
//         Campground.create(seed, function(err, campground){
//             if(err) console.log(err);
//             else {
//                 console.log("add new campgrounds");
//                 //create a comment
//                 Comment.create(
//                     {
//                         text:"Great place",
//                         author:"momo",
//                     }, function(err, comment){
//                         if(err) console.log(err);
//                         else{campground.comments.push(comment);
//                             campground.save();
//                             console.log("add a comment");
//                         }
//                     })
//             }
//             })
//     })
//   } 
});
    
}

module.exports=seedDB;