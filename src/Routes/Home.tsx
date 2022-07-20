/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";

/**To get movie data */
import { useQuery } from "react-query";
import { getNowPlayingMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**Components */
import Banner from "./Components/Banner";
import Sliders from "./Components/Sliders";
import { useHistory, useRouteMatch } from "react-router-dom";

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
  z-index: 101;
`;
const ModalDialog = styled(motion.article)`
  position: relative;
  margin: 1.5rem auto;
  max-width: 1080px;
  width: 90%;
  height: calc(100vh - 3rem);
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  overflow: auto;
  z-index: 103;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 102;
`;

function Home() {
  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  console.log(nowPlayingData);
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const history = useHistory();
  const onModalClose = () => {
    console.log("you clicked it");
    history.push("/");
  };
  return (
    <Wrapper style={{ height: "200vh" }}>
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
            movies={nowPlayingData?.results ?? []}
            title="Now Playing"
            query="nowPlayingData"
          ></Sliders>
          <AnimatePresence>
            {bigModalMatch ? (
              <>
                <Overlay
                  onClick={onModalClose}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <ModalContainer>
                  <ModalDialog layoutId={bigModalMatch.params.movieId} />
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
