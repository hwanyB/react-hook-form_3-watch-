import React, { useEffect, useRef, useState } from 'react'
import { authService, firebaseInstance } from 'fbase';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import AuthContainer from 'components/AuthContainer';

const bgimgFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
`;
const logoFade = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
`;
const bgWrapperWidth = keyframes`
  0% {
    width: 100%;

  }
  100% {
    width: 50%;
  }
`;

const bgImgWidth = keyframes`
  0% {
    width: 1600px;
  }
  100% {
    width: 900px;
    top: 60px;
  }
`;




const Base = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: 'Noto Sans KR', sans-serif;
`;


const BgBase = styled.div`
  position: absolute;
  right: 0;
  margin: 0;
  background-color: #000;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  animation: ${bgWrapperWidth} 1.8s 3s forwards;
`;

const BgWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  animation: ${bgimgFade} 1.5s 1s forwards;
  opacity: 0%;
  
`;

const BgImage = styled.img`
  position: relative;
  display: block;
  width: 1600px;
  margin: 0 auto;
  top: -260px;
  animation: ${bgImgWidth} 2s 3s forwards;

`;
const IntroLogo = styled.img`
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  animation: ${logoFade} 2s 2s forwards;
  opacity: 0%;
`;



export default function Auth() {
  

  return (
    <>
      <Base>
        <AuthContainer />
        <BgBase>
          <BgWrapper>
            <BgImage src='/mainbg.jpg' />
          </BgWrapper>
          <IntroLogo src='/logowhite.png' />
        </BgBase>
      </Base>
    </>
  );
}