const API_KEY = "468c47f1d44f563f78a809bd52e2386d";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
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

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function findMovies(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export function findTvShows(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export async function getVideos(id?: number, part?: string) {
  return await (
    await fetch(`${BASE_PATH}/${part}/${id}/videos?api_key=${API_KEY}`)
  ).json();
}
