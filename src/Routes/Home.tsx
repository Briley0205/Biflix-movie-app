/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";

/**To get movie data */
import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  IGetMoviesResult,
  getDetail,
  IMovie,
  getClipDetails,
  getRecommend,
  getTopRatedMovies,
  getUpcomingMovies,
  nowPlaying,
} from "../api";

/**Components */
import Banner from "../Components/Banner";
import Sliders from "../Components/Sliders";
import Modal from "../Components/Modal";

import { useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #141414;
  overflow-x: hidden;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const bigModalMatch = useRouteMatch<{
    part: string;
    sliderPart: string;
    id: string;
  }>("/:part/:sliderPart/:id");
  const part = bigModalMatch?.params.part;
  const id = bigModalMatch?.params.id;
  const { data: nowPlayingData, isLoading: playingLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  const { data: topRatedData, isLoading: topLoading } =
    useQuery<IGetMoviesResult>(["toprated", "movie"], getTopRatedMovies);
  const { data: upcomingData, isLoading: upcomeLoading } =
    useQuery<IGetMoviesResult>(["upcoming", "movie"], getUpcomingMovies);

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
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {playingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            id="banner"
            part="movie"
            movies={nowPlayingData?.results}
          ></Banner>
          <Sliders
            id="nowPlayingData"
            movies={nowPlayingData?.results ?? []}
            title="Now Playing"
            query="nowPlayingMovies"
            part="movie"
          ></Sliders>
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
            part="movie"
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
            part="movie"
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
