import React from "react";
import styled from "styled-components";
import riverFish from "./data/riverFish";
import seaFish from "./data/seaFish";
import FishDataList from "./FishDataList";
import { useState } from "react";
import Footer from "../Footer/Footer";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const TitleBox = styled.title`
  display: flex;
  justify-content: space-evenly;
  margin: 15px;
  color: black;
  opacity: 0.7;
`;

const Div = styled.div``;
const FishBox = styled.div`
  background-color: rgb(222, 247, 243);
  width: 100vw;
  padding-bottom: 28vh;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.7;
  padding: 5px;
  &:hover {
    background-color: rgb(222, 247, 243);
    cursor: pointer;
  }
  border-radius: 15px;
`;
const RiverFish = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgb(222, 247, 243);
  grid-gap: 1rem;
`;

const SeaFish = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: rgb(222, 247, 243);
  grid-gap: 1rem;
`;
function FishData() {
  const [sea, setSea] = useState(true);

  return (
    <>
      <Container>
        <Div>
          <TitleBox>
            <Title
              onClick={() => {
                setSea(true);
              }}
            >
              바다물고기
            </Title>
            <Title
              onClick={() => {
                setSea(false);
              }}
            >
              민물
            </Title>
          </TitleBox>
          {sea === true ? (
            <FishBox>
              <SeaFish>
                {seaFish.map((el, idx) => (
                  <FishDataList {...el} key={idx} />
                ))}
              </SeaFish>
            </FishBox>
          ) : (
            <FishBox>
              <RiverFish>
                {riverFish.map((el, idx) => (
                  <FishDataList {...el} key={idx} />
                ))}
              </RiverFish>
            </FishBox>
          )}
        </Div>
      </Container>
      <Footer />
    </>
  );
}

function FishData() {
  const columns = useMemo(() => col, []);
  const data = useMemo(() => seaFish, []);

  return (
    <div>
      <Styles>
        <h1>물고기 정보(방생기준)</h1>
        <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
}

export default FishData;
