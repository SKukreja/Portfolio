import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Icons } from '../../components/Common/Icons';
import { Helmet } from 'react-helmet-async';
import ProjectTitle from './ProjectTitle';
import ProjectSplash from './ProjectSplash';
import ProjectBlurb from './ProjectBlurb';
import Cover from '../../components/Home/Cover';
import Figure from './Figure';
import { m } from 'framer-motion';
import LoadingScreen, { loadingVariants } from '../../components/Common/LoadingScreen';
import use from '../../hooks/use'; // Ensure the correct path
import TransitionMask from '../../components/Common/TransitionMask'; // Import TransitionMask
import ScrollLine from './ScrollLine'; // Import ScrollLine component

const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  padding-left: 80px;
  height: 100%;
  min-width: 100vw;
  @media (max-width: 1024px) {
    padding-left: 0;
    padding-top: 80px;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    width: 100vw;
  }
`;

const ProjectLanding = styled(m.div)`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100vh;
  color: var(--black);
  position: relative;
  z-index: 8;
  @media (max-width: 1024px) {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100 - 80px);
  }
`;

const ProjectLandingText = styled.div`
  position: absolute;
  bottom: 7.5rem;
  left: 7.5rem;
  height: 25%;
  width: calc(100% - var(--default-spacing) * 2);
  display: block;
  @media (max-width: 1024px) {
    height: auto;
    left: var(--default-spacing);
    max-width: calc(100% - var(--default-spacing) * 2);
    bottom: 120px;
  }
`;

const StackComponents = styled.div`
  display: flex;
  max-height: 100%;
  overflow: auto;
  align-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProjectTechnology = styled.div`
  font-size: var(--body-text);
  font-family: var(--body-font);
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 2;
  text-align: left;
  letter-spacing: 0.5px;
  & svg {
    width: 40px;
    font-size: 2rem;
    padding-right: 1rem;
  }
  @media (max-width: 1024px) {
    width: 50%;
    font-size: 1rem;
  }
`;

const TextSection = styled.div`
  text-align: justify;
  letter-spacing: 0.5px; 
  &.intro {
    width: 100%;
  }
`;

const Article = styled.div`
  padding-top: 7.5rem;
  padding-bottom: 7.5rem;
  width: ${({ $columns }) => `calc(75vw * ${$columns})`};
  max-width: ${({ $columns }) => `calc(1000px * ${$columns} +  var(--default-spacing) * 4 * ${$columns})`};
  display: flex;
  flex-flow: column wrap;
  height: calc(100vh - 15rem);
  align-items: center;
  z-index: 5;
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    flex-flow: column nowrap;
    padding-top: var(--default-spacing);
    padding-bottom: 0;
    height: auto;
  }
`;

const Section = styled.div`
  margin-bottom: calc(var(--default-spacing) * 2);
  width: 75vw;
  max-width: 1000px;
  display: block;
  line-height: 2;
  padding-left: calc(var(--default-spacing) * 2);
  padding-right: calc(var(--default-spacing) * 2);
  &.figure {
    width: 75vw;
  }
  @media (max-width: 1024px) {
    &.figure {
      width: 100%;
    }
    padding-top: 0;
    flex-direction: column;
    padding-left: var(--default-spacing);
    padding-right: var(--default-spacing);
    max-width: 100%;
    width: calc(100% - var(--default-spacing) * 2);
  }
`;

const Headers = styled.div`
  width: 100%;
  font-family: var(--body-font);
  font-size: var(--body-text);
  font-weight: var(--header-weight);
  transition: opacity 0.5s ease;
  text-align: center;
  letter-spacing: 0.5px; 
  margin-bottom: var(--default-spacing);
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 1.2rem;
    padding: 0;
  }
`;

const Topic = styled.div`
  font-size: var(--body-text);
  font-family: var(--body-font);
  display: flex;
  width: 100%;
`;

const BuiltWith = styled.div`
  font-size: var(--body-text);
  font-family: var (--body-font);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TopicText = styled.div`
  & p:first-child {
    margin-top: 0;
  }
`;

const Project = ({ $isMobile, $isFirefox }) => {
  const { id } = useParams();
  const location = useLocation();

  const { data: fetchedData, loading: fetchedLoading, error: fetchedError } = use(`/slugify/slugs/work/${id}?populate=deep`);

  const [data, setData] = useState(location.state?.preloadedData || null);
  const [loading, setLoading] = useState(!location.state?.preloadedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate preloaded data
    const isValidPreloadedData = location.state?.preloadedData?.attributes;

    if (isValidPreloadedData) {
      console.log("Using preloaded data:", location.state.preloadedData);
      setData(location.state.preloadedData);
      setLoading(false);
    } else if (fetchedData) {
      console.log("Using fetched data:", fetchedData);
      setData(fetchedData);
      setLoading(fetchedLoading);
      setError(fetchedError);
    } else if (fetchedError) {
      console.log("Fetch error:", fetchedError);
      setError(fetchedError);
      setLoading(false);
    }
  }, [fetchedData, fetchedLoading, fetchedError, location.state]);

  const landingVariants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { delay: 0.5, duration: 3, type: 'linear' },
    }),
  };

  if (loading) return <LoadingScreen variants={loadingVariants} initial="hidden" animate="visible" exit="exit">Loading...</LoadingScreen>;
  if (error) return <div>Error loading project.</div>;

  return (
    <Container>
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <TransitionMask /> {/* Add the TransitionMask component */}
      <ProjectLanding variants={landingVariants} initial="hidden" animate="visible" exit="exit">
        {data && data.attributes && data.attributes.featured && (
          <>
            <ProjectSplash $isMobile={$isMobile} $imgUrl={import.meta.env.VITE_APP_UPLOAD_URL + data.attributes.featured.data.attributes.url} />
            <ProjectLandingText>
              <ProjectTitle titleText={data.attributes.title} />
              <ProjectBlurb blurbText={data.attributes.summary} />
            </ProjectLandingText>
            <ScrollLine />
          </>
        )}
      </ProjectLanding>
      {data && data.attributes && (
        <Article $columns={data.attributes.columns}>
          <Section>
            <Headers className="topic-header">Built With</Headers>
            <BuiltWith>
              <StackComponents>
                {data.attributes.technologies.data.map((technology) => (
                  <ProjectTechnology key={technology.id}>{Icons[technology.attributes.name]} {technology.attributes.name}</ProjectTechnology>
                ))}
              </StackComponents>
            </BuiltWith>
          </Section>
          {data.attributes.article.map((topic, index) => {
            const isFigure = topic.__component === 'article.figure' || topic.__component === 'article.slides';
            const first = index === 0 ? 'active' : '';
            if (isFigure) {
              return (
                <Section key={topic.id} className="figure">
                  <Figure
                    title={topic.title}
                    media={topic.__component === 'article.slides' ? topic.media : topic.__component === 'article.figure' ? topic.figure.data : topic.images.data[0]}
                    caption={topic.caption}
                    isSlider={topic.__component === 'article.slides'}
                  />
                </Section>
              );
            }

            return (
              <Section key={topic.id}>
                <TextSection className={'dark ' + first}>
                  <Headers className="topic-header">
                    {topic.header ? topic.header : ''}
                  </Headers>
                  <Topic>
                    {topic.__component === 'article.topic' ? (
                      <TopicText>
                        {topic.content}
                      </TopicText>
                    ) : topic.__component === 'article.sandbox' ? (
                      <div></div>
                    ) : (
                      ''
                    )}
                  </Topic>
                </TextSection>
              </Section>
            );
          })}
        </Article>
      )}
      <Cover $srcData={data} $isMobile={$isMobile} $isFirefox={$isFirefox} />
    </Container>
  );
};

export default Project;
