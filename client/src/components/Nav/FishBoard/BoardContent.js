import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import { connect } from "react-redux";
import Modal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";

//const AWS = require("aws-sdk/dist/aws-sdk-react-native");

const Background = styled.div`
  background-color:#8bbac2;
  width: 100%;
  height: 80vh;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    
`



const Div = styled.div`
    background-color: #ABCCFF; 
    height: 65vh;
    width: 40vw;
    background-color:#EBF1F1;
    border-radius: 8px;
    padding-bottom: 5px;
    border: gray 0.1px solid;
    box-shadow: 0 10px 25px #3c4a5645;
    margin-top: 3.5rem;
  
`;
const Day = styled.div`
    margin: 1rem;
    font-size: large;
    font-weight: bold;
    opacity: 0.7; 
`;
const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px gray;;
  border-top: solid 1px gray;
  margin: 0 1rem;
  opacity: 0.6;
`;
const Input = styled.input`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
    /* width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0; */ 
   
    
`;

const Size = styled.input`
   border:0 solid black;
   outline: none;
   
`

// const Label = styled.label`
//     display: inline-block;
//     padding: 10px;
//     color: #fff;
//     vertical-align: middle;
//     background-color: #04A1A1;
//     cursor: pointer;
//     width:70px;
//     height: 23px;
//     margin-left: 10px;
//     border-radius: 10;
//     &:hover {
//         background-color: coral;
//     }
//     box-shadow: 0 10px 25px #3c4a5645;
// `

const Select = styled.select`
    border:0 ;
    outline: none;
`
const Photo = styled.img`
  border: solid gray 2px;
  opacity: 0.6;
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
  border-bottom: solid 1px gray;
  border-top: solid 1px gray;
  opacity: 0.6;
`;
const Span = styled.span`
  margin: 0.3rem;
  font-size: large;
  font-weight: bold;
  color:black;
  opacity: 1;
`;
const Btn = styled.div`
    margin-top: 2.2rem;
    font-size: large;
    font-weight: bold;
    opacity: 0.7; 
    transition: all 0.3s ease-in-out ;
    &:hover {                
        transform: scale(1.5);
        cursor: pointer;
        color: coral;
    }
    
`

function BoardContent({ userInfo }) {

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // ?????? ????????? //* ????????? ??????????????? ranked??? ????????????..?
  /* const [record, setRecord] = useState({}); */
  const [photo, setPhoto] = useState("");
  const [size, setSize] = useState("");

  const fishList = [
    "??????????????????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "?????????",
  ];
  const [fishName, setFishName] = useState("");

  // ????????????
  let now = new Date();
  let year = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let today = now.getDate();
  const week = ["???", "???", "???", "???", "???", "???", "???"];
  let dayOfWeek = week[now.getDay()];

  
  // //* aws??????????????? *//
  // AWS.config.update({
  //   region: "ap-northeast-2", // ????????? ???????????? ????????? ???????????? ????????????. (Ex. "ap-northeast-2")
  //   credentials: new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: "ap-northeast-2:ef99751f-2c0b-464a-9500-6fd482fa1eaf", // cognito ?????? ????????? ????????? ?????? ???????????? ????????????. (Ex. "ap-northeast-2...")
  //   }),
  // });
  
  // // ?????? ?????????
  // const firstImgHandle = (event) => {
  //   const imageFile = event.target.files[0];
  //   //console.log(imageFile,'#########');
  //   setPhoto(imageFile);
  
  // const upload = new AWS.S3.ManagedUpload({ 
  //   params: {
  //     Bucket: "dajavas-photo", // ???????????? ?????? ????????? ???????????? ??????.
  //     Key: imageFile.name, //???????????? ????????? 
  //     Body: imageFile, // ???????????? ?????? ??????
  //   },
  // });

  // const promise = upload.promise();

  // promise.then(
  //   function (data) {
  //     setPhoto(data.Location);
  //   },
  //   function (err) {
  //     console.log(err);
  //   }
  // );
  // }

  
  // ADD
const save = (e) => {
    e.preventDefault();
    if (!photo || !fishName || !size) {
      alert("?????? ??????????????????");
    } else {
      //* ?????????????????? ????????? ????????? ??????????????? ?????????????????? /record??? ????????????
        axios({
        url: `${process.env.REACT_APP_BASE_URL}/fish/board`,
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
    alert("???????????? ?????????");
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
    <Background>
      <Modal text="?????? ?????? ???????????? ??????????????????" />
    
    <Container>
    <Div>
        <form onSubmit={save}>
            <Day>
                {year}??? {todayMonth}??? {today}??? {dayOfWeek}??????
            </Day>
            <File>
                <Photo src={photo} alt='??????'/>
                <Input
                type="file"
                name="file"
                // accept="image/*"
                /* onChange={firstImgHandle} */
                />
                
                
            </File>
             
            <Fish>
            <div>
              <Span>?????? ?????? </Span>
              <Select onChange={(e) => setfishname(e)}>
                {fishList.map((el, idx) => (
                  <option value={el} key={idx}>
                    {el}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Span>??????</Span>
              <Size box type="text" onChange={(e) => setsize(e)}></Size>
              <Span>cm</Span>
            </div>
            </Fish>
            {userInfo.isLogin === false ? (
            <>
              <Btn onClick={goHome}>?????? ??????</Btn>
              
            </>
          ) 
          : 
          (
            <>
              <Btn onClick={(e) => save(e)}>?????? ??????</Btn>
             
            </>
          )}
        </form>
      </Div>
    </Container>
    </Background>
    <Footer/>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer, // ????????? user??? id??? ??????????????????.
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContent);
