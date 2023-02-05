const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
require("dotenv").config();
const ejs = require("ejs");

//setup ejs

const app = express();

app.set("view engine", "ejs");

const url = "https://www.marvel.com/movies";
//const url = "https://example.com/";

axios(url)
  .then((res) => {
    const html = res.data;
    // console.log(html);
    const $ = cheerio.load(html);
    const urls = new Array();
    $(".img__wrapper", html).each(function () {
      const url = $(this)
        .find(".card-thumb-frame__thumbnail.img__blur")
        .attr("src");
      urls.push(url);
    });

    //display on index.ejs
    app.get("/", (req, res) => {
      res.render("index.ejs", { urls: urls });
    });
  })
  .catch((err) => {
    console.log(err);
  });

//APP EXPRESS SERVER RUNNING
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
