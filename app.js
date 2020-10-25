const express = require("express");
const Jikan = require("jikan-node");
const app = express();

const anime = new Jikan();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function returnSynopsis(data) {
  console.log(data);
  data.forEach((dat) => {
    return dat.synopsis;
  });
}

app.get("/anime", (req, res) => {
  // anime.findAnime("11597", "episodes", 1).then((animee) => res.send(animee));
  let animeData;
  anime
    .search("manga", "naruto")
    .then((data) => {
      animeData = data.results;
      animeData = animeData.filter((an) => {
        return an.synopsis;
      });
      console.log(animeData);
      res.json(animeData);
    })
    .catch((err) => console.log(err));
});

// app.get('/anime/11597/episodes',(req,res) =>{
//   anime.
// })

app.use(express.static("Images"));

app.listen(8000, (req, res) => {
  console.log("Server is running ");
});
