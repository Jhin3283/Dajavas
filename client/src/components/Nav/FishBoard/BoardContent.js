import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";
const AWS = require("aws-sdk/dist/aws-sdk-react-native");

const Div = styled.div`
  /*  background-color: #ABCCFF; */
  height: 70vh;
  width: 70vw;
`;
const Day = styled.div`
  border: dotted black 2px;
  margin: 1rem;
  padding: 1rem;
`;
const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid green;
  margin: 0 1rem;
`;
const Input = styled.input`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Photo = styled.img`
  border: dotted red 2px;
  margin: 0.8rem;
  padding: 2rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Fish = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  margin: 1rem;
  border: dotted black 2px;
`;
const Span = styled.span`
  margin: 0.3rem;
`;

function BoardContent({ userInfo }) {
  console.log(userInfo, "유저정보");

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // 기록 하는곳 //* 기록을 입력해줄때 ranked를 왜써줬지..?
  const [record, setRecord] = useState({});
  const [photo, setPhoto] = useState("");
  const [size, setSize] = useState("");

  const fishList = [
    "선택해주세요",
    "광어",
    "황돔",
    "우럭",
    "농어",
    "불락",
    "넙치",
    "개서대",
  ];
  const [fishName, setFishName] = useState("");
  const [error, setError] = useState("모두 기록해주세요");

  // 오늘날짜
  let now = new Date();
  let year = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let today = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[now.getDay()];

  
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

  
  // ADD
const save = (e) => {
    e.preventDefault();
    console.log(fishName, size, "@@@@@@@@@@@");
    if (!photo || !fishName || !size) {
      alert("모두 입력해주세요");
    } else {
      //* 저장되었다는 모달창 띄우자 그러고나면 네비게이트로 /record로 보내주기
        axios({
        url: `https://localhost:5000/fish/board`,
        data: {
            fish_name: fishName,
            src: photo,
            size: size,
            userId: userInfo.id,
            ranked: "0",
            },
            method: "post",
            headers: { authorizationToken: userInfo.accessToken }
        })
        .then((result) =>{
        console.log(result)
        })
        .catch((err) =>{
        console.log('ERR')
        })
    } 
    setTimeout(() => {
        navigate("/fishboard");
    }, 1000); 
}
  
  const goHome = () => {
    alert("로그인을 하세요");
    navigate("/login");
  };
  const setfishname = (e) => {
    setFishName(e.target.value);
  };
  const setsize = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <Modal text="내가 잡은 물고기를 기록해보아요" />
      <h1>기록</h1>
      <Div>
        <form onSubmit={save}>
          <Day>
            {year}년 {todayMonth}월 {today}일 {dayOfWeek}요일
          </Day>
          <File>
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
              <Span>어종 선택 </Span>
              <select onChange={(e) => setfishname(e)}>
                {fishList.map((el, idx) => (
                  <option value={el} key={idx}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Span>크기</Span>
              <input type="text" onChange={(e) => setsize(e)}></input>
              <Span>cm</Span>
            </div>
          </Fish>
          {userInfo.isLogin === false ? (
            <>
              <button onClick={goHome}>기록 저장</button>
              <button onClick={goHome}>확인</button>
            </>
          ) : (
            <>
              <button onSubmit={(e) => save(e)}>기록 저장</button>
             
            </>
          )}
        </form>
      </Div>
    </>
  );
}

const mapStateToProps = (state) => {
  //console.log(state, "++++++++++++++++++++++++");
  return {
    userInfo: state.userReducer, // 여기서 user의 id를 뽑아와야한다.
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent);
