/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";

/**To get movie data */
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: #141414;
`;

function Home() {
  return (
    <Wrapper>
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
    </Wrapper>
  );
}

export default Home;
