//First draft of schemas
const mongoose = require("mongoose"),
  URLSlugs = require("mongoose-url-slugs"),
  passportLocalMongoose = require("passport-local-mongoose");

//https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/#get-your-atlas-cluster-connection-string
// const uri =
// "mongodb+srv://admin-01:byGSzd1coOLTqnaZ@ait-cluster-1.ocfhd.mongodb.net/notTwitter?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;

// users
// * site requires authentication
// * username is not the same as the name
// * name and profile picture can change
// * users have a list of 0 or more posts
const User = new mongoose.Schema({
  username: { type: String, required: true, trim: true, lowercase: true },
  hash: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
  name: { type: String, required: true },
  // profilePicture: {type: Image, required: true} //will figure out how to store/retrieve images later
});

//test schema
const Tweet = new mongoose.Schema(
  {
    user_id: String,
    tweet: String,
  },
  { timestamps: true }
);

User.plugin(passportLocalMongoose);
// Post.plugin(URLSlugs("name"));

const mongooseOpts = {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.model("User", User);
// mongoose.model("Posts", Post);
mongoose.model("Tweet", Tweet);

mongoose.connect(uri, mongooseOpts);
