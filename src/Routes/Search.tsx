import { useQuery } from "react-query";
import { useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  findMovies,
  findTvShows,
  getClipDetails,
  getDetail,
  getRecommend,
  IGetMoviesResult,
} from "../api";
import Modal from "../Components/Modal";
import Sliders from "../Components/Sliders";

const Wrapper = styled.div`
  padding-top: 300px;
  width: 100%;
  overflow-x: hidden;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: movies, isLoading: isMovieLoading } =
    useQuery<IGetMoviesResult>([keyword, "movie"], () => findMovies(keyword));
  const { data: tvShows, isLoading: isTvLoading } = useQuery<IGetMoviesResult>(
    [keyword, "tv"],
    () => findTvShows(keyword)
  );
  const bigModalMatch = useRouteMatch<{
    part: string;
    sliderPart: string;
    id: string;
  }>("/:part/:sliderPart/:id");
  const part = bigModalMatch?.params.part;
  const id = bigModalMatch?.params.id;
  const { data: movieDetail } = useQuery(["movie", id], () =>
    getDetail(part, id || "")
  );
  const { data: movieClips } = useQuery(["clips", id], () =>
    getClipDetails(part, id || "")
  );
  const { data: movieRecomendations } = useQuery(["movieRecommend", id], () =>
    getRecommend(part, id || "")
  );
  const clips = movieClips?.results?.reverse().slice(0, 3);
  return (
    <Wrapper>
      {keyword ? (
        <>
          {isMovieLoading ? null : (
            <>
              <Sliders
                id="searchMovie"
                movies={movies?.results ?? []}
                title="Search Movie"
                query="searchMovie"
                part="movie"
              ></Sliders>
            </>
          )}
        </>
      ) : null}
      {keyword ? (
        <>
          {isTvLoading ? null : (
            <>
              <Sliders
                id="searchTvShow"
                movies={tvShows?.results ?? []}
                title="Search Tv Show"
                query="searchTvShow"
                part="tv"
              ></Sliders>
            </>
          )}
        </>
      ) : null}
      <Modal
        movieDetail={movieDetail ?? []}
        movieClips={clips ?? []}
        movieRecomendations={movieRecomendations ?? []}
      ></Modal>
    </Wrapper>
  );
}

export default Search;
