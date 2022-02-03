import React from "react";
import styled, { keyframes } from "styled-components";
import TwittingContainer from "components/TwittingContainer";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 100px 250px 0 250px;
  background-color: #e8f4ff;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <Base>
      <TwittingContainer />
    </Base>
  );
}
