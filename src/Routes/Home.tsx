/**Page Title */
import { Helmet } from "react-helmet";
/**For styled components */
import styled from "styled-components";

/**To get movie data */
import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  IGetMoviesResult,
  getMovieDetail,
  IMovie,
  getClipDetails,
  getMovieRecommend,
} from "../api";
import { AnimatePresence, motion } from "framer-motion";

/**Components */
import Banner from "../Components/Banner";
import Sliders from "../Components/Sliders";
import TrailerVideo from "../Components/Trailer";

import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";
import { MdClose } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";
import {
  getYoutubeTumbnail,
  getYoutubeVideoUrl,
  makeImagePath,
} from "../utils";

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
const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;
const ModalDialog = styled(motion.article)`
  position: relative;
  margin: 1.5rem auto;
  max-width: 901.26px;
  width: 100%;
  height: calc(100vh - 3rem);
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  overflow: auto;
  z-index: 103;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.theme.black.darker};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  &:focus {
    outline-color: #fff;
  }
`;

const DetailModal = styled.div`
  width: 100%;
  //height: 200vh;
  padding: 0 3em;
`;
const PrevModalTags = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 0.5em;
  word-break: break-word;
  .tags-label {
    color: #777;
    margin-right: 0.5em;
  }
`;
const ModalTitle = styled.h3`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 48px;
`;

const ClipPlayIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid #fff;
  border-radius: 24px;
  color: #fff;
  background-color: rgba(30, 30, 20, 0.66);
  opacity: 0;
  transition: opacity 0.2s ease-in;
`;

const ClipsSelector = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TitleCardList = styled.a`
  position: relative;
  align-items: center;
  border-bottom: 1px solid #404040;
  border-radius: 0.25em;
  display: flex;
  overflow: hidden;
  padding: 1em;
  cursor: pointer;
  &:hover {
    background-color: #333;
    ${ClipPlayIcon} {
      opacity: 1;
    }
  }
`;
const TitleCardIndex = styled.div`
  color: #d2d2d2;
  display: flex;
  flex: 0 0 5%;
  font-size: 1.3em;
  justify-content: center;
`;
const TitleCardImage = styled.div<{ coverImage?: string }>`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
  flex: none;
  width: 133px;
  height: 100px;
  background-image: url(${(props) => props.coverImage});
  background-size: cover;
`;
const TitleCardMeta = styled.div`
  height: 45px;
  font-size: 0.95em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  span {
    color: #d2d2d2;
    font-size: 14px;
  }
`;

const recommendBoxes = styled.div`
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  align-items: stretch;
  display: grid;
  justify-items: stretch;
`;
const recommendCard = styled.div``;

function Home() {
  const part = "movie";
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const movieId = bigModalMatch?.params.movieId;

  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  const { data: movieDetail } = useQuery(["movie", movieId], () =>
    getMovieDetail(movieId || "")
  );
  const { data: movieClips, isLoading: detailLoading } = useQuery(
    ["clips", movieId],
    () => getClipDetails(movieId || "")
  );
  const { data: movieRecomendations, isLoading: recommendationLoading } =
    useQuery(["movieRecommend", movieId], () =>
      getMovieRecommend(movieId || "")
    );
  console.log(movieRecomendations);

  const [isModalActive, setIsActive] = useRecoilState(modalState);

  const history = useHistory();
  const onModalClose = () => {
    setIsActive(false);
    history.push("/");
  };
  const clips = movieClips?.results?.reverse().slice(0, 3);

  return (
    <Wrapper
      style={{
        height: "200vh",
      }}
    >
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
            id="nowplayingmovies"
            movies={nowPlayingData?.results ?? []}
            title="Now Playing"
            query="nowPlayingData"
            part={part}
          ></Sliders>
          <AnimatePresence>
            {bigModalMatch ? (
              <>
                <Overlay
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ type: "tween", duration: 0.3 }}
                />
                <ModalContainer>
                  <ModalDialog layoutId={bigModalMatch.params.movieId}>
                    <div className="video">
                      <TrailerVideo id={bigModalMatch.params.movieId} />
                    </div>
                    <CloseButton onClick={onModalClose}>
                      <MdClose size="28px" />
                    </CloseButton>
                    {detailLoading ? null : (
                      <>
                        <DetailModal>
                          <section
                            className="ptrack-container"
                            style={{
                              width: "100%",
                              display: "grid",
                              gridTemplateColumns:
                                "minmax(0,2fr) minmax(0,1fr)",
                              columnGap: "2em",
                            }}
                          >
                            <div className="ptrack-container--detailsLeft">
                              <div
                                className="detailsMetaData"
                                style={{
                                  margin: "0.8em 0",
                                  color: "white",
                                  display: "flex",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                <div
                                  className="realeaseDate"
                                  style={{
                                    marginRight: "0.5em",
                                    fontWeight: "600",
                                    color: "#46d369",
                                  }}
                                >
                                  {movieDetail?.release_date}
                                </div>
                                <div
                                  className="runTime"
                                  style={{ marginRight: "0.5em" }}
                                >
                                  {movieDetail?.runtime ?? null} minutes
                                </div>
                                <span
                                  className="player-feature-badge"
                                  style={{
                                    border: "1px solid hsla(0, 0%, 100%, .4)",
                                    borderRadius: "3px",
                                    fontSize: ".7em",
                                    padding: "0.05em 0.5em",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  HD
                                </span>
                              </div>
                              <p
                                className="preview-modal-synopsis"
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "24px",
                                  marginTop: "1em",
                                  marginBottom: "0.5em",
                                }}
                              >
                                {movieDetail?.overview}
                              </p>
                            </div>
                            <div
                              className="ptrack-container--detailsRight"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <PrevModalTags>
                                <span className="tags-label">tag:</span>
                                {movieDetail?.tagline}
                              </PrevModalTags>
                              <PrevModalTags>
                                <span className="tags-label">title:</span>
                                {movieDetail?.title}
                              </PrevModalTags>
                              <PrevModalTags>
                                <span className="tags-label">genres:</span>
                                {movieDetail?.genres?.length ? (
                                  <>
                                    <span>
                                      {(movieDetail.genres || [])
                                        .map((genre: any) => genre.name)
                                        .join(", ")}
                                    </span>
                                  </>
                                ) : null}
                              </PrevModalTags>
                              <PrevModalTags>
                                <span className="tags-label">rating:</span>
                                {movieDetail?.vote_average}
                              </PrevModalTags>
                            </div>
                          </section>
                          {movieClips.length ? null : (
                            <section className="ptrack-container">
                              <div
                                className="episode-selector"
                                style={{ padding: "1em 0 0" }}
                              >
                                <div className="episodeSelector-header">
                                  <ModalTitle>CLIPS</ModalTitle>
                                </div>
                                <ClipsSelector>
                                  {clips.map((clip: any, index: any) => (
                                    <TitleCardList
                                      key={clip.key}
                                      href={getYoutubeVideoUrl(clip.key)}
                                    >
                                      <TitleCardIndex>
                                        {index + 1}
                                      </TitleCardIndex>
                                      <TitleCardImage
                                        coverImage={getYoutubeTumbnail(
                                          clip.key
                                        )}
                                      >
                                        <ClipPlayIcon>
                                          <MdPlayArrow size={48} />
                                        </ClipPlayIcon>
                                      </TitleCardImage>
                                      <TitleCardMeta>
                                        <p>{clip.name}</p>

                                        <span>
                                          {new Date(
                                            clip.published_at
                                          ).toLocaleDateString()}
                                        </span>
                                      </TitleCardMeta>
                                    </TitleCardList>
                                  ))}
                                </ClipsSelector>
                              </div>
                            </section>
                          )}
                          {recommendationLoading ? null : (
                            <>
                              <section className="ptrack-container">
                                <div className="moreLikeThis--wrapper">
                                  <ModalTitle>More like contents</ModalTitle>
                                  <div className="recommendationsBody">
                                    <div
                                      style={{
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gridGap: "1em",
                                        alignItems: "stretch",
                                        display: "grid",
                                        justifyItems: "stretch",
                                      }}
                                    >
                                      {movieRecomendations?.results?.map(
                                        (recomend: any) => (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              alignItems: "center",
                                            }}
                                          >
                                            <img
                                              src={makeImagePath(
                                                recomend.poster_path,
                                                "w500"
                                              )}
                                              style={{
                                                width: "100%",
                                                borderRadius: "5px",
                                              }}
                                            />
                                            <h4>{recomend.title}</h4>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </>
                          )}
                        </DetailModal>
                      </>
                    )}
                  </ModalDialog>
                </ModalContainer>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
