import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsInfoCircle, BsPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMovie } from "../api";
import { modalState } from "../atom";
import { makeImagePath } from "../utils";

const Mainhome = styled.div<{ bgPhoto: string }>`
  height: 56.25vw;
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
  min-height: 4.5vw;
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
const InnerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
const TitleButtonWrapper = styled.div`
  display: flex;
`;
const TitlePlayButton = styled(motion.button)`
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
`;
const TitleInfoButton = styled(TitlePlayButton)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  &:hover {
    background-color: rgba(109, 109, 110, 0.4);
  }
`;
const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface IBanner {
  id: string;
  part: string;
  movies?: IMovie[];
}

const Banner = ({ id, part, movies }: IBanner) => {
  const [movie, setMovie] = useState<IMovie>();
  useEffect(() => {
    if (movies) setMovie(movies[0]);
  }, [movies]);
  const [isModalActive, setIsActive] = useRecoilState(modalState);
  const history = useHistory();
  const onBoxClicked = (part: string, id: number, sliderId: string) => {
    history.push(`/${part}/${sliderId}/${id}`);
    setIsActive(true);
  };
  return (
    <>
      {movie ? (
        <Mainhome bgPhoto={makeImagePath(movie?.backdrop_path || "")}>
          <TitleLayer>
            <TitleWrapper>
              <BillBoardTitle>
                {part === "movie" ? movie?.title : movie?.name}
              </BillBoardTitle>
            </TitleWrapper>
            <InfoWrapper>
              <InnerInfo>
                <div
                  style={{
                    fontWeight: "600",
                    color: "rgb(70, 211, 105)",
                    marginRight: "0.5em",
                  }}
                >
                  {movie?.release_date}
                </div>
                <div style={{ fontWeight: "500", marginRight: "0.5em" }}>
                  {movie?.vote_average}
                </div>
              </InnerInfo>
              {movie?.overview}
            </InfoWrapper>
            <TitleButtonWrapper>
              <TitlePlayButton onClick={() => onBoxClicked(part, movie.id, id)}>
                <ButtonIcon>
                  <BsPlayFill size="2vw" />
                </ButtonIcon>
                <span>Play</span>
              </TitlePlayButton>
              <TitleInfoButton onClick={() => onBoxClicked(part, movie.id, id)}>
                <ButtonIcon>
                  <BsInfoCircle size="1.5vw" />
                </ButtonIcon>
                <span style={{ marginLeft: "10px" }}>Info</span>
              </TitleInfoButton>
            </TitleButtonWrapper>
          </TitleLayer>
        </Mainhome>
      ) : null}
    </>
  );
};

export default Banner;
