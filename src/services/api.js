const API_KEY = "e021b0f775a74593ca9f48407158d030";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query,page) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) =>{

  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json()
  
  return data;
}

