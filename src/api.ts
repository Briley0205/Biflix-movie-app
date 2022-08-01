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
  name?: string;
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

export interface IMovieDetail {
  genres: [number];
  homepage: string;
  id: number;
  name?: string;
  first_air_date?: string;
  episode_run_time?: [number];
  orijinal_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  backdrop_path?: string;
}
export interface IMovieRecommendations {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function HomeData(this: any, basePath: string, apiKey: string) {
    this.basePath = basePath;
    this.apiKey = apiKey;

  this.getNowPlaying = function() {
     console.log(`${this.basePath}/movie/now_playing?api_key=${this.apiKey}&language=ko-KR`)
  }
}
export const nowPlaying = new (HomeData as any)(BASE_PATH, API_KEY);
console.log(nowPlaying.getNowPlaying())

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
    (response) => response.json()
  );
}
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
    (response) => response.json()
  );
}

export function getTvAiring() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
    (response) => response.json()
  );
}
export function getTvTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
    (response) => response.json()
  );
}
export function getTvPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
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

export async function getDetail(part?: string, id?: string) {
  return fetch(`${BASE_PATH}/${part}/${id}?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}
export async function getClipDetails(part?: string, id?: string) {
  return await fetch(
    `${BASE_PATH}/${part}/${id}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export async function getTrailer(part?: string, id?: string) {
  return await (
    await fetch(`${BASE_PATH}/${part}/${id}/videos?api_key=${API_KEY}&language=ko-KR`)
  ).json();
}
export async function getRecommend(part?: string, id?: string) {
  return await fetch(
    `${BASE_PATH}/${part}/${id}/recommendations?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
