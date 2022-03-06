import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {connect} from 'react-redux'
import Modal from '../../Modal/Modal'
import { useNavigate } from "react-router-dom"
const AWS = require("aws-sdk/dist/aws-sdk-react-native");



const Div = styled.div`

    height:60vh;
    width:50vw; 
    
    margin-bottom:5px;
`
const Day = styled.div`
    border: dotted black 2px;
    margin: 1rem;
    padding: 1rem;

`
const File = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: gray 0.1px solid;
    margin: 0 1rem;

`
const Input = styled.input`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Photo = styled.img`
    border: gray 0.1px solid;
    margin:0.8rem;
    padding:2rem;
    width: 20rem;
    height: 5rem; 
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const Fish = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 1rem;
    margin: 1rem;
    border: gray 0.1px solid;
    
`
const Text = styled.div`
    font-size: 1.2rem;
    font-weight: bolder;
    color: gray;
    opacity: 0.9;
`

const Span = styled.span`
    outline: none;
    border:0;
    font-size: 1rem;
    font-weight: bolder;
    color: gray;
    opacity: 0.9;
`
const Btn = styled.button`
    background-color: #8BBAC2;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    &:hover{
        cursor: pointer;
        background-color: coral;
    }
    box-shadow: 0 10px 25px #3c4a5645;
    
`
const Size = styled.input`
    border:0 ;
    outline: none;
`

const Select = styled.select`
    border:0 ;
    outline: none;
`

function UpdateBoardContent({targetFish,userInfo,navigation}) {
   console.log(targetFish,'🤡',userInfo)

   const [isRedirect, setIsRedirect] = useState(false)

   axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    
    // 기록 하는곳 
    const [record, setRecord] = useState(targetFish)
    const [photo, setPhoto] = useState(record.src)
    const [size, setSize] = useState(record.size)
    const [rank, ranked] = useState(false)
    const fishList = ['변경안함','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState(record.fish_name)

  
   const selectRank = () => {
       ranked(!rank)
       if(rank === true) {
           return 1
       }else {
           return 0
       }
   }
  

    

   //* aws연결해야함 *//
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력하기. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:ef99751f-2c0b-464a-9500-6fd482fa1eaf", // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });
  
  // 파일 업로드
  const firstImgHandle = (event) => {
    const imageFile = event.target.files[0];
    console.log(imageFile,'#########');
    setPhoto(imageFile);
  
  const upload = new AWS.S3.ManagedUpload({ 
    params: {
      Bucket: "dajavas-photo", // 업로드할 대상 버킷명 문자열로 작성.
      Key: imageFile.name, //업로드할 파일명 
      Body: imageFile, // 업로드할 파일 객체
    },
  });

  const promise = upload.promise();

  promise.then(
    function (data) {
      setPhoto(data.Location);
    },
    function (err) {
      console.log(err);
    }
  );
  }

 


   // 수정
   const save = (e) => {
        e.preventDefault()

        if(!photo || !fishName || !size) {          
            alert('모두 입력해주세요')
       }   
        if(fishName === '변경안함') {
            axios({
                url: `https://localhost:5000/fish/board`,
                method: "put",
                headers: {authorizationtoken: userInfo.accessToken},
                data: {
                    ...record, 
                    src: photo,
                    size: size,
                    ranked: rank,
                    userId: userInfo.id
                }
            })
        }else {        
//* 저장되었다는 모달창 띄우자 그러고나면 네비게이트로 /record로 보내주기
            axios({
                url: `https://localhost:5000/fish/board`,
                method: "put",
                headers: {authorizationtoken: userInfo.accessToken},
                data: {
                    ...record, 
                    fish_name: fishName,
                    src: photo,
                    size: size,
                    ranked: rank,
                    userId: userInfo.id
                }
        })
        .then(result => {
            console.log(result)
            console.log(record,"수정된 정보.")
            
        })
        .catch(err => console.log(err))               
         
    }

    setTimeout(() => {navigate('/fishboard')}, 500)
}
   

    return (
        <Div>
            
            <form  onSubmit={save} >
                <File> 
                    <div>
                        <Text style={{fontWeight:'bolder'}}>선택한 사진 주소</Text>
                        <div> {photo}</div>  
                    </div> 
                    <Photo src={photo} alt='사진'/>
                    <Input
                        type="file"
                        name="file"
                        // accept="image/*"
                        onChange={firstImgHandle}
                        />   
                </File>
                <Fish>
                    <div>
                        <Text>
                            내가 선택한 어종: <span style={{fontWeight:'bolder'}}>{fishName} </span>
                        </Text>
                        <Span>어종 선택 </Span>
                        <Select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                        </Select>
                    </div>
                    <div>     
                        <Span>크기</Span>
                        <Size type='text' value={size} onChange={(e)=>setSize(e.target.value)}></Size><Span>cm</Span>
                        <Text onClick={() => selectRank()}>랭크 등록</Text>
                        {rank === false ? '': <FontAwesomeIcon icon={faCrown} size="3x" color='gold'/> }
                    </div>
                </Fish>
                    <Btn onClick={save}>기록 저장</Btn>
                    
            </form>   
        </Div>
    )
}

const mapStateToProps = (state) => {
    console.log(state,'++++++++++++++++++++++++') 
     return {
      targetFish: state.updateFishReducer.data,
      userInfo: state.userReducer    
    } 
}



export default connect(mapStateToProps)(UpdateBoardContent)
