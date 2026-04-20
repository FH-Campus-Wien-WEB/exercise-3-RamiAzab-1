window.onload = function () {
  loadGenres();
};


// =======================
// LOAD GENRES
// =======================
function loadGenres() {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status === 200) {
      const genres = JSON.parse(xhr.responseText);
      createButtons(genres);
    }
  };

  xhr.open("GET", "/genres");
  xhr.send();
}


// =======================
// CREATE NAV BUTTONS
// =======================
function createButtons(genres) {
  const nav = document.querySelector("nav");

  // ALL BUTTON
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.onclick = () => loadMovies();
  nav.appendChild(allBtn);

  // GENRE BUTTONS
  genres.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.onclick = () => loadMovies(g);
    nav.appendChild(btn);
  });

  // AUTO LOAD FIRST
  nav.querySelector("button").click();
}


// =======================
// LOAD MOVIES
// =======================
function loadMovies(genre) {
  const xhr = new XMLHttpRequest();

  let url = "/movies";

  if (genre) {
    url += "?genre=" + genre;
  }

  xhr.onload = function () {
    const main = document.querySelector("main");
    main.innerHTML = "";

    if (xhr.status === 200) {
      const movies = JSON.parse(xhr.responseText);

      movies.forEach(movie => {
        main.appendChild(createMovie(movie));
      });
    } else {
      main.textContent = "Error loading movies";
    }
  };

  xhr.open("GET", url);
  xhr.send();
}


// =======================
// CREATE MOVIE CARD
// =======================
function createMovie(movie) {
  const article = document.createElement("article");

  // TITLE
  const title = document.createElement("h2");
  title.textContent = movie.Title;

  // IMAGE
  const img = document.createElement("img");
  img.src = movie.Poster;

  // PLOT
  const plot = document.createElement("p");
  plot.textContent = movie.Plot;

  // INFO
  const info = document.createElement("p");
  info.textContent =
      "Released: " + movie.Released +
      " | Runtime: " + movie.Runtime + " min" +
      " | Rating: " + movie.imdbRating +
      " | Metascore: " + movie.Metascore;

  // GENRES
  const genresDiv = document.createElement("div");
  movie.Genres.forEach(g => {
    const span = document.createElement("span");
    span.textContent = g;
    span.classList.add("genre");
    genresDiv.appendChild(span);
  });

  // ACTORS
  const actors = document.createElement("p");
  actors.textContent = "Actors: " + movie.Actors.join(", ");

  // DIRECTORS
  const directors = document.createElement("p");
  directors.textContent = "Directors: " + movie.Directors.join(", ");

  // WRITERS
  const writers = document.createElement("p");
  writers.textContent = "Writers: " + movie.Writers.join(", ");

  // EDIT BUTTON
  const btn = document.createElement("button");
  btn.textContent = "Edit";
  btn.onclick = () => {
    location.href = "edit.html?imdbID=" + movie.imdbID;
  };

  // APPEND
  article.appendChild(title);
  article.appendChild(img);
  article.appendChild(plot);
  article.appendChild(info);
  article.appendChild(genresDiv);
  article.appendChild(actors);
  article.appendChild(directors);
  article.appendChild(writers);
  article.appendChild(btn);

  return article;
}