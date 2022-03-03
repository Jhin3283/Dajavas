import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import axios from "axios";
import {connect} from 'react-redux'
import Modal from '../../Modal/Modal'
import { useNavigate } from "react-router-dom"
const AWS = require("aws-sdk/dist/aws-sdk-react-native");



const Div = styled.div`
   /*  background-color: #ABCCFF; */
    height:60vh;
    width:50vw; 
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
    border: 2px solid green;
    margin: 0 1rem;

`
const Input = styled.input`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Photo = styled.img`
    border: dotted red 2px; 
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
    border: dotted black 2px;
    
`
const Span = styled.span`
    margin: 0.3rem;
`
const Btn = styled.button`
    background-color: #4087FE;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    cursor: grab;

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
    
    const fishList = ['변경안함','광어', '황돔', '우럭', '농어', '불락', '넙치', '개서대']
    const [fishName, setFishName] = useState(record.fish_name)

  
   
  

    

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
                    ranked: 1,
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
                    ranked: 1,
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
                    <div>선택한 사진 주소: {photo}</div>   
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
                        <div>
                            내가 선택한 어종: {fishName}
                        </div>
                        <Span>어종 선택 </Span>
                        <select onChange={(e)=>setFishName(e.target.value)}>
                            {fishList.map((el,idx) => <option value={el} key={idx}>{el}</option>)}
                        </select>
                    </div>
                    <div>     
                        <Span>크기</Span>
                        <input type='text' value={size} onChange={(e)=>setSize(e.target.value)}></input><Span>cm</Span>
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
