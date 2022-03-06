import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
import axios from "axios";
import { connect } from "react-redux";

const Div = styled.div`
  border: solid 1px wheat;
`;

function Like({
  location_name,
  long,
  lat,
  bookmarkList,
  id,
  userInfo,
  render,
  rerender,
}) {
  const selectLocation = bookmarkList.find((el) => el.id === id);

  const deleteList = () => {
    console.log("삭제", id, selectLocation);

    axios({
      url: `https://localhost:5000/map`,
      method: "delete",
      headers: { authorizationToken: userInfo.accessToken },
      data: { locationId: selectLocation.id },
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    rerender(!render);
  };
  return (
    <>
      {long !== undefined ? (
        <Div>
          <div>{location_name}</div>
          <div>{lat}</div>
          <div>{long}</div>
          <FontAwesomeIcon icon={faPencil} color="skyblue" margin="10px" />
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => deleteList()}
            color="skyblue"
          />
        </Div>
      ) : (
        <Div>
          <div>정보없음</div>
          <div>-</div>
          <div>-</div>
=======
import axios from 'axios';
import { connect } from 'react-redux';
import { useState } from 'react'


const Div = styled.div`
    border:0;
    background-color:#EBF1F1;
    box-shadow: 0 10px 40px #3c4a5645;
    border-radius: 1%;
    margin: 2px;
    margin-right:1.0rem;
    margin-left: 1.0rem;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        
    }
    
`
const Input = styled.input`
    border: 0;
    border-radius: 6%;
    background-color: #EBF1F1;
   text-align: center;
    outline: none; 
    cursor: pointer;
    margin-top: 10px;
    font-weight: bolder;
    font-size: x-large;
    color: #04A1A1;
    padding:15px;
`

const Title = styled.div`
    font-size: x-large;
    font-weight: bolder;
    color: #04A1A1;
    padding:10px;
    padding-bottom: 0;
`

const Loc = styled.div`
    opacity: 0.7; 
`
const IconContainer = styled.div`
    display:flex;
    justify-content: center;
`
const Icon = styled.div`
   margin-right: 10px;
   padding: 3px;
   font-size: 1.3rem;
   &:hover {
       cursor: pointer;
       transform: scale(1.1);
       color: coral;
       opacity: 0.7;
   }
`



function Like({location_name, long, lat, bookmarkList, id, userInfo, bookmark }) {
   
    const selectLocation = bookmarkList.find(el => el.id === id)

    const [text, setText] = useState(false)
    const deleteList = () => {
        console.log('삭제', id, selectLocation)
        
        axios({
            url: `https://localhost:5000/map`,
            method: "delete",
            headers: {authorizationToken: userInfo.accessToken},
            data: {locationId: selectLocation.id}
          })
        .then(result => console.log(result))
        .catch(err => console.log(err))
       bookmark()
        
    }

    const patchList = () => {
        console.log('수정')
        setText(!text)

        axios({
            url: `https://localhost:5000/map`,
            method: "patch",
            headers: {authorizationToken: userInfo.accessToken},
            data: {
                locationId: selectLocation.id,
                location_name: text
            }
          })
        .then(result => console.log(result))
        .catch(err => console.log(err))
         bookmark() 
        
        
    }
    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <>
        {long !== undefined ?
            <>  
                { text === false ? 
        
                    <Div>
                        <Title>{location_name}</Title>
                        <Loc>{lat}</Loc>
                        <Loc>{long}</Loc>
                        <IconContainer>
                        <Icon>
                        <FontAwesomeIcon  icon={faPencil} onClick={() => patchList()} color='skyblue' margin='10px'/> 
                        </Icon>
                        <Icon>
                        <FontAwesomeIcon  icon={faTrashCan} onClick={() =>deleteList()} color='skyblue'/>
                        </Icon>
                        </IconContainer>
                    </Div>
        
                : 
                    <Div>
                    <Input type ='text' placeholder={location_name} onChange={onChange}/>
                    <Loc>{lat}</Loc>
                    <Loc>{long}</Loc>
                    <IconContainer>
                    <Icon>
                    <FontAwesomeIcon  icon={faPencil} onClick={() => patchList()} color='skyblue' margin-right='10px'/> 
                    </Icon>
                    <Icon>
                    <FontAwesomeIcon  icon={faTrashCan} onClick={() =>deleteList()} color='skyblue'/>
                    </Icon>
                    </IconContainer>
                    </Div>
                }    
            </>
        :
        <Div>
        <Title>정보없음</Title>
        
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
        </Div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps)(Like);
