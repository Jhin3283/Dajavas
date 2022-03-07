import React from "react";
import styled from "styled-components";
import Wave from "react-wavify";

<<<<<<< HEAD
const Div = styled.div``;
=======
const Div = styled.div`
  
  width: 100vw;
  height: 100vh;
  background-color: #8bbac2;

`;
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3

const Blank = styled.div`
  padding-top: 100px;
  margin:0;
  font-weight: bolder;
  font-size: xx-large;
  background-color: #8bbac2;
`

const BlueWave = styled.div`
  width:100vw;
  height:100vh;
  background-color: #1277b0;
  margin-top:0;
`

function LoadingPage() {
  return (
    <Div>
<<<<<<< HEAD
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
=======
    <Blank>로딩중...</Blank> 
    <Wave
      fill = '#1277b0'
      paused={false}
      options={{
        height: 80,
        amplitude: 40,
        speed: 0.30,
        points: 8
      }}

    /> 
      <BlueWave></BlueWave> 
   
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
    </Div>
  );
}

export default LoadingPage;