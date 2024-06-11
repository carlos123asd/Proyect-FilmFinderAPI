const tmdbKey = 'd6c3c51e0123932185a5a725676589d8';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmMzYzUxZTAxMjM5MzIxODVhNWE3MjU2NzY1ODlkOCIsInN1YiI6IjY2NjgxY2JiMDgxY2UyNDI2MGVhMDQ4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5Arf2o5ZY9a0oL9vkxadpBs-BIOc2_WSCq0zHJ7D-w'
  }
};
/*https://api.themoviedb.org/3/movie/550?api_key=d6c3c51e0123932185a5a725676589d8*/
/*
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));*/

const getGenres = async () => {
  //const genreRequestEndpoint = '/genre/movie/list'
  //const requestParams = tmdbKey
  //const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams
  try{
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    if(response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
    throw new Error('Error conection API');
  }catch(error){
      console.log(error);
  }
};

const getMovies = async () => {
  try{
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
    if(response.ok){
      const jsonresponse = await response.json();
      const movies = jsonresponse.results;
      return movies;
    }
    throw new Error('Error with the conection');
  }catch(error){
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
    movieId = movie.id;
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,options);
      if(response.ok){
        const movieInfo = await response.json();
        return movieInfo;
      }
     throw new Error('Error conection API'); 
    }catch(error){
        console.log(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies() //PELICULAS
  const randomMovie = getRandomMovie(movies) //ELEGIMOS UNA PELICULA RANDOM
  const info = await getMovieInfo(randomMovie); //INFOR DE LA PELI RANDOM
  displayMovie(info);
};
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;