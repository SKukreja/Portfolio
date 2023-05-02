import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../../components/Common/Icons';

const WorkContainer = styled.div``;

const Cover = styled.div``;

const CoverImage = styled.img``;

const Work = () => {
  const { id } = useParams();
  const { data, loading, error } = use(
    `/works?filters\[Slug\][$eq]=` + id + `&populate=deep`
  );

  if (error) return (
    <>{error}</>
  )
  return (
    <WorkContainer>
      <Cover>
        <CoverImage src={data.attributes.cover.url} />
      </Cover>
    </WorkContainer>
  )
}

export default Work