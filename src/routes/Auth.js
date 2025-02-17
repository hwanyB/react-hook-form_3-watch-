import React from "react";
import styled, { keyframes } from "styled-components";
import AuthContainer from "components/AuthContainer";

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
const bgWrapperWidth2 = keyframes`
  0% {
    width: 100%;

  }
  100% {
    width: 40%;
  }
`;
const bgWrapperWidth3 = keyframes`
  0% {
    width: 100%;

  }
  100% {
    width: 0%;
  }
`;

const bgImgWidth = keyframes`
  0% {
    width: 1600px;
  top: -260px;

  }
  100% {
    width: 900px;
    top: 60px;
  }
`;
const bgImgWidth2 = keyframes`
  0% {
    width: 1400px;
  top: -200px;

  }
  100% {
    width: 600px;
    top: 180px;
  }
`;
const bgImgWidth3 = keyframes`
  0% {
    width: 900px;
    left: -50px;
  top: 15px;

  }
  100% {
    width: 400px;
    top: 250px;
  }
`;
const bgImgWidth4 = keyframes`
  0% {
    width: 700px;
  top: 150px;

  }
  100% {
    width: 400px;
    top: 250px;
  }
`;

const Base = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: "Noto Sans KR", sans-serif;
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
  @media screen and (max-width: 1500px) {
    animation: ${bgWrapperWidth2} 1.8s 3s forwards;
  }
  @media screen and (max-width: 800px) {
    animation: ${bgWrapperWidth3} 1.8s 3s forwards;
  }
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
  top: -260px;
  width: 1600px;
  margin: 0 auto;
  animation: ${bgImgWidth} 2s 3s forwards;
  @media screen and (max-width: 1500px) {
    animation: ${bgImgWidth2} 1.8s 3s forwards;
    top: -200px;
    width: 1400px;
  }
  @media screen and (max-width: 800px) {
    animation: ${bgImgWidth3} 1.8s 3s forwards;
    top: 15px;
    width: 900px;
    left: -50px;
  }
  @media screen and (max-width: 600px) {
    animation: ${bgImgWidth4} 1.8s 3s forwards;
    top: 150px;
    width: 700px;
  }
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

export default function Auth({ isLoggedIn }) {
  return (
    <>
      <Base>
        <AuthContainer isLoggedIn={isLoggedIn} />
        <BgBase>
          <BgWrapper>
            <BgImage src={`${process.env.PUBLIC_URL}/mainbg.jpg`} />
          </BgWrapper>
          <IntroLogo src={`${process.env.PUBLIC_URL}/logowhite.png`} />
        </BgBase>
      </Base>
    </>
  );
}
