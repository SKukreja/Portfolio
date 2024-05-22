import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from '../../components/Project/Slider';

const FigureContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--default-spacing);
  height: fit-content;
  text-align: center;
  display: block;
  & img, & video {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    object-fit: cover;
  }
  opacity: 1;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
  @media (max-width: 1024px) {
    width: 100vw;
    height: fit-content;
  }
`;

const Headers = styled.div`
  width: 100%;
  font-family: var(--body-font);
  font-size: var(--body-text);
  font-weight: var(--header-weight);
  transition: opacity 0.5s ease;
  text-align: center;
  margin-bottom: var(--default-spacing);
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 1.2rem;
    padding: 0;
  }
`;

const Caption = styled.span`
  margin-top: var(--default-spacing);
  overflow: visible;
  width: calc(100% - var(--default-spacing) * 2);
  display: block;
  font-size: var(--body-text);
  font-family: var(--body-font);
  font-style: italic;
  color: var(--black);
  padding-left: var(--default-spacing);
  padding-right: var(--default-spacing);
`;

const FigureMedia = ({ item }) => {
  const getMediaType = (mime) => {
    if (mime.startsWith("video")) {
      return "video";
    }
    return "image";
  };

  const type = getMediaType(item.attributes.mime);
  const src = import.meta.env.VITE_APP_UPLOAD_URL + item.attributes.url;
  const videoRef = useRef(null);

  return (
    <>
      {type === "image" ? (
        <img src={src} alt="" />
      ) : (
        <video ref={videoRef} autoPlay muted playsInline loop controls>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
};

const Figure = ({ title, media, caption, isSlider }) => {
    const [figureHeight, setFigureHeight] = useState(0);
    const figureRef = useRef(null);
    

    return (
        <FigureContainer ref={figureRef} $dynamicHeight={figureHeight} className='light'>
            <Headers className='topic-header'>{title}</Headers>
            {isSlider ? (
            <Slider media={media} />
            ) : (
            <FigureMedia item={media} />
            )}
            <Caption>{caption}</Caption>
        </FigureContainer>
    );
}

export default Figure;
