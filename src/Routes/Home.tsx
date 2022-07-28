/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";

/**To get movie data */
import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  IGetMoviesResult,
  getMovieDetail,
  IMovie,
  getClipDetails,
  getMovieRecommend,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { AnimatePresence, motion } from "framer-motion";

/**Components */
import Banner from "../Components/Banner";
import Sliders from "../Components/Sliders";
import Modal from "../Components/Modal";

import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

const Wrapper = styled.div`
  background-color: #141414;
  overflow-x: hidden;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MovieDetailRouteState {
  movie?: IMovie;
  layoutId?: string;
}

function Home() {
  const part = "movie";
  const bigModalMatch = useRouteMatch<{ movieId: string }>(
    "/movies/:part/:movieId"
  );
  const movieId = bigModalMatch?.params.movieId;
  const location = useLocation() as { state: MovieDetailRouteState };
  const locationStateLayoutId = location.state?.layoutId ?? undefined;
  console.log(locationStateLayoutId);

  const { data: nowPlayingData, isLoading: playingLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  const { data: topRatedData, isLoading: topLoading } =
    useQuery<IGetMoviesResult>(["toprated", "movie"], getTopRatedMovies);
  const { data: upcomingData, isLoading: upcomeLoading } =
    useQuery<IGetMoviesResult>(["upcoming", "movie"], getUpcomingMovies);

  const { data: movieDetail, isLoading: movieLoading } = useQuery(
    ["movie", movieId],
    () => getMovieDetail(movieId || "")
  );
  const { data: movieClips, isLoading: detailLoading } = useQuery(
    ["clips", movieId],
    () => getClipDetails(movieId || "")
  );
  const { data: movieRecomendations, isLoading: recommendationLoading } =
    useQuery(["movieRecommend", movieId], () =>
      getMovieRecommend(movieId || "")
    );
  console.log(movieRecomendations);
  const clips = movieClips?.results?.reverse().slice(0, 3);

  return (
    <Wrapper>
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {playingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner movies={nowPlayingData?.results}></Banner>
          <Sliders
            id="nowPlayingData"
            movies={nowPlayingData?.results ?? []}
            title="Now Playing"
            query="nowPlayingData"
            part={part}
          ></Sliders>
          {/* <Modal
            movieDetail={movieDetail ?? []}
            movieClips={clips ?? []}
            movieRecomendations={movieRecomendations ?? []}
          ></Modal> */}
        </>
      )}
      {upcomeLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Sliders
            id="upcomingData"
            movies={upcomingData?.results ?? []}
            title="UP Coming Movie"
            query="upcomingData"
            part={part}
          ></Sliders>
        </>
      )}
      {topLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Sliders
            id="topratedData"
            movies={topRatedData?.results ?? []}
            title="TOP Rated"
            query="topratedData"
            part={part}
          ></Sliders>
        </>
      )}
      <Modal
        movieDetail={movieDetail ?? []}
        movieClips={clips ?? []}
        movieRecomendations={movieRecomendations ?? []}
      ></Modal>
    </Wrapper>
  );
}

export default Home;
