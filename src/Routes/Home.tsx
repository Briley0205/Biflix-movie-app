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
import { useRouteMatch } from "react-router-dom";

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
  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  console.log(nowPlayingData);
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
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
            movies={nowPlayingData?.results}
            title="Now Playing"
            query="nowPlayingData"
          ></Sliders>
          <AnimatePresence>
            {bigModalMatch ? (
              <motion.div
                layoutId={bigModalMatch.params.movieId}
                style={{
                  position: "absolute",
                  width: "40vw",
                  height: "80vh",
                  backgroundColor: "red",
                  top: 50,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
