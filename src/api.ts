const API_KEY = "468c47f1d44f563f78a809bd52e2386d";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  poster_path: string;
  genre_ids: [number];
  id: number;
  release_date: string;
  title: string;
  overview: string;
  video: boolean;
  vote_average: number;
}

export interface IGetMoviesResult {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
