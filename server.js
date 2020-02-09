const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", (req, res) => {
  axios.get("https://www.ign.com/reviews").then(response => {
    let $ = cheerio.load(response.data);
  
    $("article").each(function(i, element) {
      let result = {};

      result.title = $(element).children(".item-body").children(".item-details").children("a").children(".item-title").text();

      result.score = $(element).children(".item-body").children(".item-thumbnail").find("span.hexagon-content").text();

      result.link = "https://www.ign.com/reviews" + $(element).children(".item-body").children(".item-details").children("a").attr("href");
      
      db.Article.create(result)
      .then(dbArticle => {
        console.log(dbArticle);
      }).catch(err => {
        console.log(err);
      });
    });
    res.redirect("/");
  });
});

app.get("/articles", (req, res) => {
  db.Article.find({}).then(dbArticle => {
      res.json(dbArticle);
    }).catch(err => {
      res.json(err);
    });
});
 
app.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id }).populate("note")
    .then(dbArticle => {
      res.json(dbArticle);
    }).catch(err => {
      res.json(err);
    });
});

app.post("/articles/:id", (req, res) => {
  db.Note.create(req.body).then(dbNote => {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(dbArticle => {
      res.json(dbArticle);
    }).catch(err => {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
