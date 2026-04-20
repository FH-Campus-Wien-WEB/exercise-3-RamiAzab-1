const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'files')));


// ✅ GET GENRES
app.get('/genres', function (req, res) {
  const movies = Object.values(movieModel);

  const genresSet = new Set();

  movies.forEach(movie => {
    movie.Genres.forEach(g => genresSet.add(g));
  });

  const genres = Array.from(genresSet).sort();

  res.json(genres);
});


// ✅ GET ALL / FILTER BY GENRE
app.get('/movies', function (req, res) {
  let movies = Object.values(movieModel);

  const genre = req.query.genre;

  if (genre) {
    movies = movies.filter(m => m.Genres.includes(genre));
  }

  res.json(movies);
});


// ✅ GET ONE
app.get('/movies/:imdbID', function (req, res) {
  const movie = movieModel[req.params.imdbID];

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});


// ✅ PUT (UPDATE / CREATE)
app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = req.body;

  if (movieModel[imdbID]) {
    movieModel[imdbID] = movie;
    res.sendStatus(200);
  } else {
    movieModel[imdbID] = movie;
    res.status(201).json(movie);
  }
});


// START SERVER
app.listen(3000);
console.log("Server now listening on http://localhost:3000/");