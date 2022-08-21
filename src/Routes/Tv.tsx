import { Helmet } from "react-helmet";

/**For Route */
import { useRouteMatch } from "react-router-dom";

/**For style */
import styled from "styled-components";

/**Components */
import Slider from "../Components/Sliders";
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
  getTvPopular,
} from "../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  overflow-x: hidden;
  background-color: #141414;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderWrapper = styled.div`
  position: relative;
  top: -15vw;
  min-width: 840px;
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
  const { data: tvPopularData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["popular", "tv"], getTvPopular);

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
  const isLoading =
    pairingLoading || trendingLoading || popularLoading || false;
  const clips = getClips?.results?.slice(-3).reverse();
  return (
    <Wrapper>
      <Helmet>
        <title>Tv Show | BIFLIX</title>
        <link rel="icon" href="../image/Logo-piyo.svg" />
      </Helmet>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            id="banner"
            part="tv"
            movies={nowAiringData?.results}
          ></Banner>
          <SliderWrapper>
            <Slider
              id="nowAiringData"
              movies={nowAiringData?.results ?? []}
              title="Now On Air"
              query="nowPlayingShow"
              part="tv"
            ></Slider>
            <Slider
              id="popularData"
              movies={tvPopularData?.results ?? []}
              title="Popular Tv Show"
              query="popularTvShow"
              part="tv"
            ></Slider>
            <Slider
              id="topRatedData"
              movies={tvTrendingData?.results ?? []}
              title="Top Rated Tv Show"
              query="topRatedTvShow"
              part="tv"
            ></Slider>
          </SliderWrapper>
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
