// //First draft of schemas
// const mongoose = require("mongoose"),
//   URLSlugs = require("mongoose-url-slugs"),
//   passportLocalMongoose = require("passport-local-mongoose");

// // users
// // * site requires authentication
// // * username is not the same as the name
// // * name and profile picture can change
// // * users have a list of 0 or more posts
// const User = new mongoose.Schema({
//   username: { type: String, required: true },
//   hash: { type: String, required: true },
//   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
//   name: { type: String, required: true },
//   // profilePicture: {type: Image, required: true} //will figure out how to store/retrieve images later
// });

// // post
// // * post does not require text or image, but needs one or the other to be put into the database
// // * timestamp needed for logging order of main feed
// const Post = new mongoose.Schema({
//   user: { type: String, required: true },
//   text: { type: String },
//   //image: {type: Image},
//   createdAt: { type: Date, required: true },
// });

// User.plugin(passportLocalMongoose);
// Post.plugin(URLSlugs("name"));

// mongoose.model("User", User);
// mongoose.model("Post", Post);
// mongoose.connect("mongodb://localhost/notTwitterdb");
