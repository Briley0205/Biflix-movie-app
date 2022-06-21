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
const Loader = styled.div`
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 56.25vw;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(19, 16, 16, 0),
      rgba(19, 16, 16, 0.7),
      rgb(0, 0, 0)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  return (
    <Wrapper style={{ height: "200vh" }}>
      <Helmet>
        <title>Home | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          ></Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
