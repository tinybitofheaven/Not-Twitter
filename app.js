require("./db.js");
// require("./auth");

const passport = require("passport");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const Posts = mongoose.model("Posts");
const routes = require("./routes/index");

// const post = require("./routes/post");

const app = express();

const logger = (req, res, next) => {
  console.log(
    "Method: " + req.method,
    "\n",
    "Path: " + req.path,
    "\n",
    req.query
  );
  next();
};

//logger
// app.use(logger);

// view engine setup
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "hbs");

// enable sessions
// const session = require("express-session");
// const sessionOptions = {
//   secret: "cookie_key", //TODO: move elsewhere
//   resave: true,
//   saveUninitialized: true,
// };
// app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// passport setup
// app.use(passport.initialize());
// app.use(passport.session());

//https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/#get-your-atlas-cluster-connection-string
// const client = new MongoClient(uri, { useUnifiedTopology: true });

// try {
//   await client.connect();

//   // const database = client.db("sample_mflix");
//   // const collection = database.collection("movies");

//   // Query for a movie that has the title 'Back to the Future'
//   // const query = { genres: "Comedy", poster: { $exists: true } };
//   // const cursor = await collection.aggregate([
//   //   { $match: query },
//   //   { $sample: { size: 1 } },
//   //   { $project:
//   //     {
//   //       title: 1,
//   //       fullplot: 1,
//   //       poster: 1
//   //     }
//   //   }
//   // ]);

//   // const movie = await cursor.next();

//   // return res.json(movie);
// } catch (err) {
//   console.log(err);
// } finally {
//   // Ensures that the client will close when you finish/error
//   await client.close();
// }

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.json());

app.use("/", routes);
// app.use('/???', post);

// app.listen(3000);
app.listen(process.env.PORT || 3000);
