import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieTrailer } from "../api";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc((100vh - 48px) * (3 / 5));
  object-fit: contain;
  iframe {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;
const ModalTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(0deg, #181818, transparent 50%);
`;

interface IGetTrailer {
  id: string;
}
interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

const TrailerVideo = ({ id }: IGetTrailer) => {
  const [videoKey, setVideoKey] = useState("");
  useEffect(() => {
    (async () => {
      const { results } = await getMovieTrailer(id);
      const trailer = results.filter(
        (result: IVideo) => result.type === "Trailer"
      );
      const randomVideo =
        trailer[Math.ceil(Math.random() * (trailer.length - 1))];
      const videoKey = randomVideo?.key;
      setVideoKey(videoKey);
    })();
  }, [id]);
  return (
    <>
      {videoKey ? (
        <Wrapper>
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=0&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <ModalTitleWrapper />
        </Wrapper>
      ) : null}
    </>
  );
};
export default TrailerVideo;