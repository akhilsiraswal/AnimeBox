const express = require("express");
const Jikan = require("jikan-node");
const app = express();
const bodyParser = require("body-parser");

const anime = new Jikan();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("Images"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.set("view engine", "ejs");

app.get("/anime", (req, res) => {
  let animeData;
  const animeToSearch = req.query.search;
  anime
    .search("manga", animeToSearch)
    .then((data) => {
      animeData = data.results;
      // res.send(animeData);
      res.render("animes", {
        animeData: animeData,
      });
    })
    .catch((err) => res.send(err));
});

app.listen(8000, (req, res) => {
  console.log("Server is running ");
});
