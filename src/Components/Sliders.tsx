import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

const SliderWrapper = styled.div`
  position: relative;
  margin: 3vw 0;
  height: 25vw;
  padding: 0;
  &:hover svg {
    opacity: 1;
  }
  width: 100%;
  display: inline-block;
  min-height: 200px;
`;
const SliderTitle = styled.h2`
  line-height: 1.3;
  font-size: 1.4vw;
  font-weight: 700;
  margin: 0 4% 0.5em 4%;
  text-decoration: none;
  display: inline-block;
  min-width: 6em;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  margin-bottom: 5px;
  grid-template-columns: repeat(6, 1fr);
  padding: 0 4%;
  position: absolute;
`;
const rowVariants = {
  hidden: ({ prev }: { prev: boolean }) => ({
    x: prev ? "-100vw" : "100vw",
  }),
  visible: {
    x: 0,
  },
  exit: ({ prev }: { prev: boolean }) => ({
    x: prev ? "100vw" : "-100vw",
  }),
};
const MovieBox = styled(motion.div)`
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img {
    width: 100%;
    border-radius: 5px;
    transition-delay: 1s;
    &:hover {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  cursor: pointer;
`;
const MovieBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -30,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
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
  line-height: 1;
  color: #fff;
  z-index: 11;
  background: rgba(20, 20, 20, 0.5);
  border-radius: 0 5px 5px 0;
  svg {
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.1s ease;
    opacity: 0;
  }
  &:hover svg {
    color: rgb(255, 255, 255);
    transform: scale(1.4);
  }
`;
const RightArrow = styled(ArrowBox)`
  right: 0;
  border-radius: 5px 0 0 5px;
`;

const MovieBoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  margin-top: -5px;
  width: 100%;
  bottom: 0;
  opacity: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  h4 {
    text-align: center;
    font-size: 1vw;
  }
`;
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface IData {
  id: string;
  title: string;
  query: string;
  movies: IMovie[];
  part: string;
}

const Slider = ({ id, title, movies, part }: IData) => {
  const [index, setIndex] = useState(0);
  const [sliderMoving, setSliderMoving] = useState(false);
  const [sliderMovingPrev, setSliderMovingPrev] = useState(false);

  const totalMovies = movies?.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const increaseIndex = () => {
    if (!sliderMoving && movies) {
      setSliderMoving(true);
      setSliderMovingPrev(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (!sliderMoving && movies) {
      setSliderMovingPrev(true);
      setSliderMoving(true);
      setIndex((prev) => (prev === maxIndex ? prev - 1 : 0));
    }
  };
  const onExitCompleteSlider = () => {
    setSliderMoving(false);
    setSliderMovingPrev(false);
  };
  const [isModalActive, setIsActive] = useRecoilState(modalState);
  const history = useHistory();
  const onBoxClicked = (part: string, id: number, sliderId: string) => {
    history.push(`/${part}/${sliderId}/${id}`);
    setIsActive(true);
  };
  return (
    <SliderWrapper>
      <SliderTitle>{title}</SliderTitle>
      {index === 0 ? null : (
        <ArrowBox onClick={decreaseIndex}>
          <MdKeyboardArrowLeft size="3vw" />
        </ArrowBox>
      )}
      <AnimatePresence
        custom={{ prev: sliderMovingPrev }}
        initial={false}
        onExitComplete={onExitCompleteSlider}
      >
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={{ prev: sliderMovingPrev }}
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies
            ?.slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <MovieBox
                variants={MovieBoxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(part, movie.id, id)}
                key={movie.id}
              >
                <img src={makeImagePath(movie.poster_path, "w500")} />
                <MovieBoxInfo variants={infoVariants}>
                  {part === "movie" ? (
                    <h4>{movie.title}</h4>
                  ) : (
                    <h4>{movie.name}</h4>
                  )}
                </MovieBoxInfo>
              </MovieBox>
            ))}
        </Row>
      </AnimatePresence>
      <RightArrow onClick={increaseIndex}>
        <MdKeyboardArrowRight size="3vw" />
      </RightArrow>
    </SliderWrapper>
  );
};

export default Slider;
