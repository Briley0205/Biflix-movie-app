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
} from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

/**Components */
import Banner from "./Components/Banner";
import Sliders from "./Components/Sliders";
import TrailerVideo from "./Components/Trailer";

import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

interface MovieDetailState {
  movie?: IMovie;
  layoutId: string;
}

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
const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;
const ModalDialog = styled(motion.article)`
  position: relative;
  margin: 1.5rem auto;
  //max-width: 1080px;
  max-width: 901.26px;
  //width: 90%;
  width: 100%;
  height: calc(100vh - 3rem);
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  overflow: auto;
  z-index: 103;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 100;
`;

function Home() {
  const part = "movie";
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  const { data: movieDetail } = useQuery(
    ["movie", bigModalMatch?.params.movieId],
    () => getMovieDetail(bigModalMatch?.params.movieId || ""),
    {
      refetchOnWindowFocus: false,
    }
  );
  //console.log(movieDetail);

  const [isModalActive, setIsActive] = useRecoilState(modalState);

  const history = useHistory();
  const onModalClose = () => {
    setIsActive(false);
    console.log(isModalActive);
    history.push("/");
  };

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
          <AnimatePresence>
            {bigModalMatch ? (
              <>
                <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <ModalContainer>
                  <ModalDialog
                    layoutId={bigModalMatch.params.movieId}
                    onClick={onModalClose}
                  >
                    <div className="video">
                      <TrailerVideo id={bigModalMatch.params.movieId} />
                    </div>
                  </ModalDialog>
                </ModalContainer>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
