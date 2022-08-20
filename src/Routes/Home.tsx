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
  getClipDetails,
  getRecommend,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";

/**Components */
import Banner from "../Components/Banner";
import Slider from "../Components/Sliders";
import Modal from "../Components/Modal";

import { useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  overflow-x: hidden;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderWrapper = styled.div`
  position: relative;
  top: -15vw;
  display: inline-block;
  min-width: 840px;
  width: auto;
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
  const isLoading = playingLoading || topLoading || upcomeLoading || false;

  const clips = movieClips?.results?.reverse().slice(0, 3);
  return (
    <Wrapper>
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            id="banner"
            part="movie"
            movies={nowPlayingData?.results}
          ></Banner>
          <SliderWrapper>
            <Slider
              id="nowPlayingData"
              movies={nowPlayingData?.results ?? []}
              title="Now Playing"
              query="nowPlayingMovies"
              part="movie"
            ></Slider>
            <Slider
              id="upcomingData"
              movies={upcomingData?.results ?? []}
              title="UP Coming Movie"
              query="upcomingData"
              part="movie"
            ></Slider>
            <Slider
              id="topratedData"
              movies={topRatedData?.results ?? []}
              title="TOP Rated"
              query="topratedData"
              part="movie"
            ></Slider>
          </SliderWrapper>
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
