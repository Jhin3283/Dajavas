import React from 'react';
import styled from 'styled-components';
import riverFish from './data/riverFish';
import seaFish from './data/seaFish';
import FishDataList from './FishDataList'
import { useState } from 'react'

const Container = styled.div`
    display:flex;
    justify-content: center;
`
const TitleBox = styled.title`
    display:flex;
    justify-content: space-evenly;
    margin: 15px;
    color:black;
    opacity: 0.7
    
`

const Div = styled.div`
   /*  display:flex;
    justify-content: space-evenly;
    width:500px;
    height: 500px;
    border: red 2px solid; */

`
const FishBox = styled.div`
    border: dotted 2px green;
    width: 100vw;
   
`
const Title = styled.div`
    
    font-size:2rem;
    font-weight: bold;
    opacity: 0.7;
    padding: 5px;
    &:hover {
        background-color: rgb(222, 247, 243);
        cursor: pointer;
    }
    border-radius: 15px;
`
const RiverFish = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    background-color: rgb(222, 247, 243);
    grid-gap: 1rem;
`

const SeaFish = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    background-color:rgb(222, 247, 243);
    grid-gap: 1rem;
`
function FishData() {

    const [sea, setSea] = useState(true)

  
    return (
        <Container>
        <Div>
        <TitleBox>
            <Title onClick={() => {setSea(true)}}>바다물고기</Title>
            <Title onClick={() => {setSea(false)}}>민물</Title>
        </TitleBox>
            {sea === true ?
                <FishBox>
                    <SeaFish>
                        {seaFish.map((el,idx) =>  <FishDataList {...el} key={idx}/>)}
                    </SeaFish>
                </FishBox>
                :
                <FishBox>
                    <RiverFish>
                    {riverFish.map((el,idx) => <FishDataList {...el} key={idx} />)}
                    </RiverFish>    
                </FishBox>
            }   
                
            </Div>
        </Container>
    )
}

export default FishData
