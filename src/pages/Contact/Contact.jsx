import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: var(--desktop-container-width);
  margin-left: auto;
  margin-right: auto;
  margin-top: 25vh;
  margin-top: 25svh;
  margin-bottom: calc(var(--default-spacing) * 2);
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const ContactVideo = styled.video`
  width: 50%;
  border: 5px solid var(--accent-colour);
  border-radius: 15px;
  z-index: 1;
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    border: none;
  }
`;

const ContactForm = styled.div`
  padding-right: var(--default-spacing);
  width: 50%;
  @media (max-width: 768px) {
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`;

const ContactFormHeader = styled.h1`
  font-size: 4rem;
  color: var(--accent-colour);
  margin-top: calc(-0.5 * var(--default-spacing));
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ContactFormBody = styled.form`
  width: calc(100% - var(--default-spacing) - 10px);
  display: flex;
  flex-direction: column;
  & input, textarea {
    width: calc(100% - var(--default-spacing) - 10px);
    padding: 1rem;
    margin-bottom: 1rem;
    border: 5px solid rgba(255,255,255,0.1);
    border-radius: 15px;
    background: transparent;
    color: var(--offwhite);
    font-family: 'Satoshi';
    font-size: var(--body-text);
    &:focus {
      outline: none;
      border: 5px solid var(--accent-colour);
    }
  }
  & textarea {
    height: 10rem;
  }
  & input[type="submit"] {
    background: var(--accent-colour);
    color: var(--offwhite);
    border: none;
    cursor: pointer;
    width: 100%;
    transition: all 0.5s ease;
    &:hover {
      background: var(--offwhite);
      color: var(--accent-colour);
    }
  }
  @media (max-width: 768px) {
    width: calc(100% - -var(--default-spacing) - 10px);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: var(--default-spacing);
  }
`;

const Contact = () => {
  const videoRef = useRef(null);
  useEffect(() => {
      videoRef.current.play();
  }, []);
  return (
    <Container as={motion.div} 
    initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}>
      <ContactVideo ref={videoRef} src={'/assets/contact.mp4'} autoplay muted playsinline loop />
      <ContactForm>
        <ContactFormHeader>Say Hello!</ContactFormHeader>
        <ContactFormBody>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message" />
          <input type="submit" value="Send" />
        </ContactFormBody>
      </ContactForm>
    </Container>
  )
}

export default Contact