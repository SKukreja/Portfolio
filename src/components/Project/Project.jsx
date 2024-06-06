import React, { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Icons } from '../Common/Icons';
import { Helmet } from 'react-helmet-async';
import ProjectTitle from './ProjectTitle';
import ProjectSplash from './ProjectSplash';
import ProjectBlurb from './ProjectBlurb';
import Cover from '../Footer/Cover';
import Figure from './Figure';
import { m } from 'framer-motion';
import TransitionMask from '../Common/TransitionMask';
import ScrollLine from './ScrollLine';
import CustomLink from '../Common/CustomLink';

const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  padding-left: 80px;
  height: 100%;
  width: max-content;
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
  width: calc(20vw + var(--vh) * 130 * 4/3);
  height: calc(var(--vh) * 100);
  color: var(--black);
  position: relative;
  z-index: 8;
  @media (max-width: 1024px) {
    width: 100vw;
  }
  @media (max-width: 1024px) {
    height: calc(var(--vh, 1vh) * 100 - 80px);
    margin-right: 0;
  }
`;

const ProjectLandingText = styled.div`
  position: absolute;
  bottom: calc(var(--default-spacing) * 2);
  left: calc(var(--default-spacing) + 80px);
  width: 20vw;
  max-width: 1280px;
  display: block;
  @media (max-width: 1024px) {
    height: auto;
    width: 100vw;
    left: var(--default-spacing);
    max-width: calc(100% - var(--default-spacing) * 2);
    bottom: calc(var(--default-spacing) * 3);
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
  padding-top: 7.5vh;
  padding-bottom: 7.5vh;
  width: max-content;
  display: flex;
  flex-flow: column wrap;
  height: calc(var(--vh) * 100 - 15rem);
  align-items: center;
  z-index: 5;
  margin-left: calc(var(--default-spacing) * -2);
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    flex-flow: column nowrap;
    margin-left: 0;
    padding-top: var(--default-spacing);
    padding-bottom: 0;
    height: max-content;
  }
`;

const Section = styled(m.div)`
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

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
  }
`;

const Action = styled.a`
  z-index: 2;  
  letter-spacing: 0.5px;
  color: var(--offwhite);    
  font-family: var(--body-font);
  font-size: calc(var(--body-text));  
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  width: calc(100% - var(--default-spacing));
  position: relative;  
  margin-top: calc(var(--default-spacing));
  margin-bottom: calc(var(--default-spacing));
  display: flex;  
  justify-content: center;
  background: var(--black);
  cursor: pointer;  
  padding: 1rem;
  transition: background 0.5s ease;
  &:hover {
    background: var(--interact-hover-color);
  }
  & svg {
    width: calc(var(--body-text)); 
    margin-right: 1rem;
  }
`;

const SmallSection = styled.div`
  display: flex;
  height: calc(var(--vh) * 100);  
  width: calc(75vw / 4);
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: calc(var(--default-spacing) * 2);
  padding-right: calc(var(--default-spacing));
  @media (max-width: 1024px) {
    width: calc(100% - var(--default-spacing) * 2);
    height: auto;
    padding-left: var(--default-spacing);
    padding-right: var(--default-spacing);
    padding-bottom: calc(var(--default-spacing) * 2);
  }
`;

const Project = ({ $isMobile, $isFirefox, data, socialData }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!data || !id) return;
    const thisProject = data?.filter(project => project.attributes.slug === id);
    if (thisProject.length > 0) {
      setProject(thisProject[0]);
    }
  }, [data, id]);

  const landingVariants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { delay: 0.5, duration: 1.5, type: 'linear' },
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, duration: 1.5 },
    },
  };

  return (
    <Container>
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <TransitionMask /> {/* Add the TransitionMask component */}
      <ProjectLanding variants={landingVariants} initial="hidden" animate="visible" exit="exit">
        {project && project.attributes && project.attributes.featured && (
          <>
            <ProjectSplash
              $isMobile={$isMobile}
              $img={project.attributes.featured}
            />
            <ProjectLandingText>
              <ProjectTitle titleText={project.attributes.title} />
              <ProjectBlurb blurbText={project.attributes.summary} />
            </ProjectLandingText>
            <ScrollLine />
          </>
        )}
      </ProjectLanding>
      {project && project.attributes && (
        <Article $columns={project.attributes.columns}>
          <Section variants={sectionVariants} viewport={{ once: true }}>
            <Headers className="topic-header">Built With</Headers>
            <BuiltWith>
              <StackComponents>
                {project.attributes.technologies.data.map((technology) => (
                  <ProjectTechnology key={technology.id}>
                    {Icons[technology.attributes.name]} {technology.attributes.name}
                  </ProjectTechnology>
                ))}
              </StackComponents>
            </BuiltWith>
          </Section>
          {project.attributes.article.map((topic, index) => {
            const isFigure = topic.__component === 'article.figure' || topic.__component === 'article.slides';
            if (isFigure && topic) {
              return (
                <Section
                  key={topic.id}
                  className="figure"
                  variants={sectionVariants}
                  viewport={{ once: true }}
                >
                  <Figure
                    title={topic.title}
                    media={topic.__component === 'article.slides' ? topic.media.data : topic.figure.data}
                    caption={topic.caption}
                    isSlider={topic.__component === 'article.slides'}
                  />
                </Section>
              );
            }

            return (
              <Section
                key={topic.id}
                variants={sectionVariants}
                viewport={{ once: true }}
              >
                <TextSection>
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
      <SmallSection initial="hidden" variants={sectionVariants} viewport={{ once: true }}>
        <Links>
        {project && project.attributes.links?.map((action, index) => {
          return <Action key={index} target='_blank' aria-label={action.name} href={action.url}>{Icons[action.icon]} {action.name}</Action>;
        })}
        </Links>
      </SmallSection>
      <Cover $isMobile={$isMobile} $isFirefox={$isFirefox} socialData={socialData} />
    </Container>
  );
};

export default React.memo(Project);
