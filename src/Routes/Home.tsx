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
} from "../api";
import { AnimatePresence, motion } from "framer-motion";

/**Components */
import Banner from "./Components/Banner";
import Sliders from "./Components/Sliders";
import TrailerVideo from "./Components/Trailer";

import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";
import { MdClose } from "react-icons/md";
import { getYoutubeTumbnail } from "../utils";

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
  height: 200vh;
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
const ClipsHeader = styled.h3`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 48px;
`;
const ClipsSelector = styled.div``;
const TitleCardList = styled.div``;
const TitleCardIndex = styled.div``;
const TitleCardImage = styled.div<{ coverImage?: string }>`
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
const TitleCardMeta = styled.div``;

function Home() {
  const part = "movie";
  const bigModalMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data: nowPlayingData, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["nowPlaying", "movie"], getNowPlayingMovies);
  const { data: movieDetail } = useQuery(
    ["movie", bigModalMatch?.params.movieId],
    () => getMovieDetail(bigModalMatch?.params.movieId || "")
  );
  //console.log(movieDetail);
  const { data: movieClips, isLoading: detailLoading } = useQuery(
    ["clips", bigModalMatch?.params.movieId],
    () => getClipDetails(bigModalMatch?.params.movieId || "")
  );
  console.log(movieClips);

  const [isModalActive, setIsActive] = useRecoilState(modalState);

  const history = useHistory();
  const onModalClose = () => {
    setIsActive(false);
    history.push("/");
  };
  const clips = movieClips?.results?.slice().reverse();

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
                                  <ClipsHeader>CLIPS</ClipsHeader>
                                </div>
                                <ClipsSelector>
                                  {clips.map((clip: any, index: any) => (
                                    <TitleCardList key={clip.key}>
                                      <TitleCardIndex>
                                        {index + 1}
                                      </TitleCardIndex>
                                      <TitleCardImage
                                        coverImage={getYoutubeTumbnail(
                                          clip.key
                                        )}
                                      ></TitleCardImage>
                                      <TitleCardMeta></TitleCardMeta>
                                    </TitleCardList>
                                  ))}
                                </ClipsSelector>
                              </div>
                            </section>
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
