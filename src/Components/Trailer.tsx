import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTrailer } from "../api";

const Wrapper = styled.div`
  position: relative;
  width: calc(100% + 2px);
  right: 0;
  left: 0;
  top: 0;
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
  part?: string;
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

const TrailerVideo = ({ part, id }: IGetTrailer) => {
  const [videoKey, setVideoKey] = useState("");
  useEffect(() => {
    (async () => {
      const { results } = await getTrailer(part, id);
      const trailer = results.filter(
        (result: IVideo) => result.type === "Trailer"
      );
      const randomVideo =
        trailer[Math.ceil(Math.random() * (trailer.length - 1))];
      const videoKey = randomVideo?.key;
      setVideoKey(videoKey);
      console.log(videoKey);
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          ></iframe>
          <ModalTitleWrapper />
        </Wrapper>
      ) : null}
    </>
  );
};
export default TrailerVideo;
