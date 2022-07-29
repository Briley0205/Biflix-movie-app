import { Helmet } from "react-helmet";

/**For Route */
import { useRouteMatch } from "react-router-dom";

/**For style */
import styled from "styled-components";

/**Components */
import Sliders from "../Components/Sliders";
import Modal from "../Components/Modal";
import Banner from "../Components/Banner";

/**For interface && getting data */
import {
  getClipDetails,
  getDetail,
  getRecommend,
  IGetMoviesResult,
  getTvAiring,
  getTvTopRated,
} from "../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  background-color: #141414;
  overflow-x: hidden;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Tv() {
  const bigModalMatch = useRouteMatch<{
    part: string;
    sliderPart: string;
    id: string;
  }>("/:part/:sliderPart/:id");
  const part = bigModalMatch?.params.part;
  const id = bigModalMatch?.params.id;

  const { data: nowAiringData, isLoading: pairingLoading } =
    useQuery<IGetMoviesResult>(["nowAiring", "tv"], getTvAiring);
  const { data: tvTrendingData, isLoading: trendingLoading } =
    useQuery<IGetMoviesResult>(["top", "tv"], getTvTopRated);

  const { data: bannerData, isLoading: bannerLoading } =
    useQuery<IGetMoviesResult>(["tv", "Banner"], () =>
      getDetail("tv", id || "")
    );

  /**Getting detail data */
  const { data: detail } = useQuery(["detail", id], () =>
    getDetail(part, id || "")
  );
  const { data: getClips } = useQuery(["clips", id], () =>
    getClipDetails(part, id || "")
  );
  const { data: recomendations } = useQuery(["recommend", id], () =>
    getRecommend(part, id || "")
  );
  const clips = getClips?.results?.reverse().slice(0, 3);
  console.log(nowAiringData);
  return (
    <Wrapper>
      <Helmet>
        <title>Tv Show | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {pairingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            id="banner"
            part="tv"
            movies={nowAiringData?.results}
          ></Banner>
          <Sliders
            id="nowAiringData"
            movies={nowAiringData?.results ?? []}
            title="Now On Air"
            query="nowPlayingShow"
            part="tv"
          ></Sliders>
        </>
      )}
      {trendingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Sliders
            id="trendingData"
            movies={tvTrendingData?.results ?? []}
            title="Top Rated Tv Show"
            query="topRatedTvShow"
            part="tv"
          ></Sliders>
        </>
      )}
      <Modal
        movieDetail={detail ?? []}
        movieClips={clips ?? []}
        movieRecomendations={recomendations ?? []}
      ></Modal>
    </Wrapper>
  );
}

export default Tv;
