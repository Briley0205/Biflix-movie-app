/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";
import { BsPlayFill, BsInfoCircle } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/**To get movie data */
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";
import { useState } from "react";

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
const TitleLayer = styled.div`
  width: 36%;
`;
const TitleWrapper = styled.div``;
const BillBoardTitle = styled.div`
  min-height: 6.5vw;
  max-width: 85%;
  margin-bottom: 1.2vw;
  font-size: 2.5vw;
  font-weight: 500;
`;
const InfoWrapper = styled.div`
  margin-bottom: 36px;
  width: 100%;
  font-size: 1.2vw;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
`;
const TitleButtonWrapper = styled.div`
  display: flex;
`;
const TitlePlayButton = styled.button`
  -webkit-box-align: center;
  align-items: center;
  appearance: none;
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  opacity: 1;
  padding: 0.3rem 1.5rem;
  position: relative;
  user-select: none;
  will-change: background-color, color;
  word-break: break-word;
  white-space: nowrap;
  margin-right: 14px;
  background-color: white;
  color: black;
  font-size: 1vw;
  font-weight: 600;
`;
const TitleInfoButton = styled(TitlePlayButton)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
`;
const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  position: relative;
  top: -8%;
  //top: -150px;
  position: relative;
  margin: 3vw 0;
  padding: 0;
`;
const SliderTitle = styled.h2`
  //margin-left: 4%;
  line-height: 1.3;
  font-size: 1.4vw;
  font-weight: 700;
  margin: 0 4% 0.5em 4%;
  text-decoration: none;
  display: inline-block;
  min-width: 6em;
  /* margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px; */
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  margin-bottom: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  padding: 0 4%;
  //width: 100%;
`;
const MovieBox = styled(motion.div)`
  //font-size: 64px;
  //border-radius: 3px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  //position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
`;
const ArrowBox = styled(motion.span)`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 20;
  width: 4%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  //font-size: 0.75vw;
  line-height: 1;
  color: #fff;
  z-index: 11;
  background: rgba(20, 20, 20, 0.5);
  border-radius: 0 5px 5px 0;
`;
const RightArrow = styled(ArrowBox)`
  right: 0;
  border-radius: 5px 0 0 5px;
`;

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
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
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <TitleLayer>
              <TitleWrapper>
                <BillBoardTitle>{data?.results[0].title}</BillBoardTitle>
              </TitleWrapper>
              <InfoWrapper>{data?.results[0].overview}</InfoWrapper>
              <TitleButtonWrapper>
                <TitlePlayButton>
                  <ButtonIcon>
                    <BsPlayFill size="2vw" />
                  </ButtonIcon>
                  <span>Play</span>
                </TitlePlayButton>
                <TitleInfoButton>
                  <ButtonIcon>
                    <BsInfoCircle size="1.5vw" />
                  </ButtonIcon>
                  <span style={{ marginLeft: "10px" }}>Info</span>
                </TitleInfoButton>
              </TitleButtonWrapper>
            </TitleLayer>
          </Banner>
          <Slider>
            <SliderTitle>Now Playing</SliderTitle>
            <Row>
              <ArrowBox>
                <MdKeyboardArrowLeft size="1.8em" />
              </ArrowBox>
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <MovieBox key={movie.id}>
                    <img src={makeImagePath(movie.poster_path, "w500")} />
                  </MovieBox>
                ))}
              <RightArrow>
                <MdKeyboardArrowRight size="1.8em" />
              </RightArrow>
            </Row>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
