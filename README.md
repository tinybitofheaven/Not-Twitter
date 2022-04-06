# Not Twitter

## Overview

Not Twitter is like Twitter but simpler. You'll be able to make an account, post text and photos, delete your old posts and see what other people post. You can also change your profile.

## Data Model

The application will store Users and Posts

* users can have many posts
* posts can have text and/or images

An Example User:

```javascript
{
  username: "not_twitter_user",
  hash: // a password hash,
  posts: // an array of references to Post documents
  name: "James"
  profile_picture: //a referencce to an image file in MongoDB
}
```

An Example Post with Embedded Items:

```javascript
{
  user: // a reference to a User object
  text: "I posted something!", //or null if user does not write text
  image: //a referencce to an image file in MongoDB or null if user does not upload an image
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/feed - page for showing posts from all users ordered by time stamp

![feed](documentation/feed.png)

/profile - page for your profile information and all your previous posts

![profile](documentation/profile.png)

/post - page for creating a new Not Twitter post

![post](documentation/post.png)

/login - page for logging into your account

![login](documentation/login.png)

/signup - page for creating a new account

![signup](documentation/signup.png)


## Site map

![list create](documentation/site-map.png)

## User Stories or Use Cases

1. As non-registered user, I can make a new account with the site.
2. As a user, I can log in to the site.
3. As a logged in user, I can make a new post.
4. As a logged in user, I can view all of my previous posts.
5. As a logged in user, I can delete one of my old posts.
6. As a logged in user, I can change my name and profile picture.
7. As a logged in user, I can see posts made by other people.

## Research Topics

* (2 points) Integrate user authentication
    * Use passport for user authentication
    * And account has been made for testing
    * see <code>TBA</code> for signup page
    * see <code>TBA</code> for login page
* (3 points) Perform client side form validation using a JavaScript library
    * see <code>TBA</code>
    * confirm that either an image or text has been entered for a new post
    * confirm that posts to be deleted actually exist
* (3 points) Use GridFS
    * GridFS allows images to be stored on MongoDB
    * Not Twitter needs to allow users to post images (both for their profile pictures and posts)
    * images need to be able to be retrieved later on for display
    * [GridFS documentation](https://data-flair.training/blogs/mongodb-gridfs-tutorial/)

8 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. TBA
