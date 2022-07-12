import { useEffect, useState } from "react";
import { BsInfoCircle, BsPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { IMovie } from "../../api";
import { makeImagePath } from "../../utils";

const Mainhome = styled.div<{ bgPhoto: string }>`
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
interface IBanner {
  movies?: IMovie[];
}

const Banner = ({ movies }: IBanner) => {
  const [movie, setMovie] = useState<IMovie>();
  useEffect(() => {
    if (movies) setMovie(movies[0]);
  }, [movies]);
  return (
    <>
      {movie ? (
        <Mainhome bgPhoto={makeImagePath(movie?.backdrop_path || "")}>
          <TitleLayer>
            <TitleWrapper>
              <BillBoardTitle>{movie?.title}</BillBoardTitle>
            </TitleWrapper>
            <InfoWrapper>{movie?.overview}</InfoWrapper>
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
        </Mainhome>
      ) : null}
    </>
  );
};

export default Banner;
