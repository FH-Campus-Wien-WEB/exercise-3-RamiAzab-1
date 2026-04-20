window.onload = function () {
  loadGenres();
};

// LOAD GENRES
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

// CREATE BUTTONS
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

  // AUTO CLICK FIRST
  nav.querySelector("button").click();
}


// LOAD MOVIES
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
    }
  };

  xhr.open("GET", url);
  xhr.send();
}


// CREATE MOVIE ELEMENT
function createMovie(movie) {
  const article = document.createElement("article");

  const title = document.createElement("h2");
  title.textContent = movie.Title;

  const img = document.createElement("img");
  img.src = movie.Poster;

  const plot = document.createElement("p");
  plot.textContent = movie.Plot;

  const genresDiv = document.createElement("div");

  movie.Genres.forEach(g => {
    const span = document.createElement("span");
    span.textContent = g;
    span.classList.add("genre");
    genresDiv.appendChild(span);
  });

  const btn = document.createElement("button");
  btn.textContent = "Edit";
  btn.onclick = () => {
    location.href = "edit.html?imdbID=" + movie.imdbID;
  };

  article.appendChild(title);
  article.appendChild(img);
  article.appendChild(plot);
  article.appendChild(genresDiv);
  article.appendChild(btn);

  return article;
}