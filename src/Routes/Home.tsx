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
} from "../api";
import { AnimatePresence, motion } from "framer-motion";

/**Components */
import Banner from "../Components/Banner";
import Sliders from "../Components/Sliders";
import Modal from "../Components/Modal";

import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

const Wrapper = styled.div`
  background-color: #141414;
  overflow-x: hidden;
`;
const Loader = styled.div`
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const part = "movie";
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const movieId = bigModalMatch?.params.movieId;

  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
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
    <Wrapper
      style={{
        height: "200vh",
      }}
    >
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {popularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner movies={nowPlayingData?.results}></Banner>
          <Sliders
            id="nowplayingmovies"
            movies={nowPlayingData?.results ?? []}
            title="Now Playing"
            query="nowPlayingData"
            part={part}
          ></Sliders>
          <Modal
            movieDetail={movieDetail ?? []}
            movieClips={clips ?? []}
            movieRecomendations={movieRecomendations ?? []}
          ></Modal>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
