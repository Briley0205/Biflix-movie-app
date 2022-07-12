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
        </>
      )}
    </Wrapper>
  );
}

export default Home;
