import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import styled from 'styled-components';
import Slider from '../../components/Project/Slider';

// Styled components
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
  margin-bottom: calc(var(--default-spacing) * 1.5);
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

// Memoize the media rendering component to avoid unnecessary re-renders
const FigureMedia = memo(({ item }) => {
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
        <video ref={videoRef} autoPlay muted playsInline loop style={{pointerEvents: 'none'}}>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
});

const Figure = ({ title, media, caption, isSlider }) => {
  const [figureMedia, setFigureMedia] = useState(null);
  const figureRef = useRef(null);

  // Use useEffect to set figureMedia only when media changes
  useEffect(() => {
    if (!media) return;
    setFigureMedia(media);
  }, [media]);

  return (
    <FigureContainer ref={figureRef} className='light'>
      <Headers className='topic-header'>{title}</Headers>

      {media && isSlider && (
        <Slider media={media} />
      )}

      {media && !isSlider && (
        <FigureMedia item={media} />
      )}
      <Caption>{caption}</Caption>
    </FigureContainer>
  );
}

export default Figure;
