import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from "framer-motion";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../../components/Common/Footer';

const Container = styled.div`
  width: var(--desktop-container-width);
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--content-margin-top);
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
  & .recaptcha {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    width: calc(100% - -var(--default-spacing) - 10px);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: var(--default-spacing);
  }
`;

const CheckmarkContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: calc(100% - -var(--default-spacing) - 10px);
    justify-content: center;
    margin-bottom: var(--default-spacing);
  }
}
`;

const SuccessMessage = styled.p`
  margin-left: 1rem;  
`;

const Checkmark = () => {
  let progress = useMotionValue(90);
  const circleLength = useTransform(progress, [0, 100], [0, 1]);
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1]);
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#ec4359", "#ec4359", "#66BB66"]
  );

  return (
    <CheckmarkContainer>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress }}
        transition={{ duration: 1 }}
      />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 258 258"
      >
        {/* Check mark  */}
        <motion.path
          transform="translate(60 85)"
          d="M3 50L45 92L134 3"
          fill="transparent"
          stroke="#7BB86F"
          strokeWidth={8}
          style={{ pathLength: checkmarkPathLength }}
        />
        {/* Circle */}
        <motion.path
          d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
          fill="transparent"
          strokeWidth="8"
          stroke={circleColor}
          style={{
            pathLength: circleLength
          }}
        />
      </motion.svg>
      <SuccessMessage>Your message has been sent successfully!</SuccessMessage>
    </CheckmarkContainer>
  );
}

const Contact = () => {
  const videoRef = useRef(null);
  const form = useRef();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCaptchaChange = value => {
    setCaptchaValue(value);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    if (captchaValue) { // checks if reCAPTCHA is filled out
      emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAIL_PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            if(result.text === 'OK') {
              setIsSubmitted(true);
            }
        }, (error) => {
            console.log(error.text);
        });
    } else {
      alert('Please verify that you are not a robot.');
    }
  };

  return (
    <>
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
      <ContactVideo ref={videoRef} src={'/assets/contact.mp4'} autoPlay muted playsInline loop />
      <ContactForm className='form'>
      {!isSubmitted ? (
        <>
          <ContactFormHeader>Say Hello!</ContactFormHeader>
          <ContactFormBody ref={form} onSubmit={sendEmail}>
            <input type="text" name="from_name" placeholder="Name" />
            <input type="email" name="reply_to" placeholder="Email" />
            <textarea name="message" placeholder="Message" />
            <ReCAPTCHA className='recaptcha' theme='dark' sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
            <input type="submit" value="Send" />
          </ContactFormBody>
        </>
      ) : (
        <>
          <ContactFormHeader>Thank You!</ContactFormHeader>
          <Checkmark/>
        </>
      )}
      </ContactForm>
    </Container>
    <Footer />
    </>
  )
}

export default Contact