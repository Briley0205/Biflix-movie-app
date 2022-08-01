import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { findMovies, findTvShows, IGetMoviesResult } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const { data: movies, isLoading: isMovieLoading } =
		useQuery<IGetMoviesResult>([keyword, "movie"], () =>
			findMovies(keyword)
		);
	const { data: tvShows, isLoading: isTvLoading } = useQuery<IGetMoviesResult>(
		[keyword, "tv"],
		() => findTvShows(keyword)
	);
  console.log(movies, tvShows);
  return null;
}

export default Search;
