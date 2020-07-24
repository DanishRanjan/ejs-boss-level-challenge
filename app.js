//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome Everyone , My name is Danish Ranjan| I have gained a mix of industrial and research experience: both of which, I feel a CS enthusiast must explore, for the latter is incomplete without the former. My internships at American Express, Microsoft, IBM-Research, and MIDAS@IIITD have helped me polish my software engineering skills while cultivating a research mindset.I have been particularly interested in Natural Language Processing and Human-Computer Interaction. And apart from this techy part, I am a Story Writer | District level athletes | Love to click precious moment| A psycho Extrovert | Vocalist ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render('home', { 
    startingContent: homeStartingContent,
    posts: posts               
  });
});


app.get("/about", function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render('contact', { contactContent: contactContent });
});


app.get("/compose", function (req, res) {
  res.render("compose");
});


app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post", {                     //this post is post.ejs not a constant which is declared upper
        title: post.title,
        content: post.content
      });
    }
  });
})

 






app.listen(3000, function () {
  console.log("Server started on port 3000");
});


