import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";

const Div = styled.div``;

function LoadingPage() {
  return (
    <Div>
      <Wave
        fill="#2aa1b7"
        mask="url(#mask)"
        paused={false}
        options={{ height: 10, points: 20, speed: 0.2, amplitude: 40 }}
      >
        <mask id="mask">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="#d8d7d8" />
        </mask>
      </Wave>
    </Div>
  );
}

export default LoadingPage;
