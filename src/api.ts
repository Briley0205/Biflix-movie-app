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
  popularity: number;
  vote_count: number;
  is_tv?: boolean;
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

export async function getMovieDetail(id?: string) {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export async function getClipDetails(id?: string) {
  return await fetch(`${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export async function getMovieTrailer(id?: string) {
  return await (
    await fetch(`${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}`)
  ).json();
}
export async function getMovieRecommend(id?: string) {
  return await fetch(
    `${BASE_PATH}/movie/${id}/recommendations?api_key=${API_KEY}`
  ).then((response) => response.json());
}
