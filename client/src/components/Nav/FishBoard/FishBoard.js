import React from "react";
import { Link } from "react-router-dom";
import FishList from "./FishList";
import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import photo from "../../../img/월척.png";
import { fishBoard } from "../../../redux/store/actions/index";
import Modal from "../../Modal/Modal";
import LoadingPage from "../../../LoadingPage";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
//import { faCrown } from "@fortawesome/free-regular-svg-icons"

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;
const Btn = styled.button`
  width: 10em;
  height: 5em;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
`;
=======
import { useNavigate } from "react-router-dom"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"
import Footer from '../../Footer/Footer';


const Background = styled.div`
    background-color:#8bbac2;   
    display: flex;
    justify-content: center;
    align-items: center;
`

const Div = styled.div`
    height: 110vh;
    width:100vw;
    margin-bottom: 2rem;
    margin-top: 1rem;
    
    
  
`

const Title = styled.div`
    /* text-shadow: 3px 3px #D8D7D8; */
    margin-top:10px;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    transition: all 0.7s ease-in-out;
    border-radius: 5%;
    margin-left: 35rem;
    margin-right: 35rem;
    background-color: #8DD1B4;
    box-shadow: 3px 3px #D8D7D8;
    &:hover {                
        transform: scale(1.1);
    }
    
`
const Span = styled.span`
    text-align: center;
`
const Btn = styled.div`
    width:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: red;
    
`
const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin:1rem;
`
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

<<<<<<< HEAD
const Page = styled.h4`
  padding: 3px;
`;

function FishBoard({ userInfo, myFishBoard, fishBoard }) {
  console.log(myFishBoard, "😹");
  axios.defaults.withCredentials = true;

  // 로그인 여부 userInfo.isLogin
  console.log(userInfo, myFishBoard, fishBoard, "++++++++");
  const [loading, setLoading] = useState(false);
  const [render, rerender] = useState(false);
  const [page, setPage] = useState(1);

  const start = () => {
    if (userInfo.isLogin === true) {
      fishBoard(userInfo.email, page, userInfo.accessToken);
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
=======
const Page = styled.h2`
    color: black;
    opacity: 0.7;
    padding: 6px;
    transition: all 0.5s ease-in-out ;
    &:hover {                
        transform: scale(1.5);
        cursor: pointer;
        color: coral;
    }
`

function FishBoard({userInfo, myFishBoard, fishBoard}) {
    console.log(myFishBoard, '😹')
    axios.defaults.withCredentials = true;
    
    // 로그인 여부 userInfo.isLogin
    console.log(userInfo, myFishBoard, fishBoard , '++++++++')
    const [loading, setLoading] = useState(false)
    const [render, rerender] = useState(false)
    const [page, setPage] = useState(1)

    const start = () => {
        if(userInfo.isLogin === true) {
            fishBoard(userInfo.email, page, userInfo.accessToken)
            setTimeout(() => {setLoading(!false)}, 3000)        
        }else{
            setTimeout(() => {setLoading(!false)}, 3000)
        }
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
    }
  };

  /*  useEffect(() => {
        start()
    }, [])  */

<<<<<<< HEAD
  // 페이지네이션
  useEffect(() => {
    start();
  }, [page]);

  // 삭제할때 필요함(fishList에서 상태변경됨)
  useEffect(() => {
    if (userInfo.isLogin === true) {
      fishBoard(userInfo.email, page, userInfo.accessToken);
      setTimeout(() => {
        setLoading(!false);
      }, 3000);
    }
  }, [render]);

  //console.log(myFishBoard.data.data.realResult,'🌺')
  // const dd = myFishBoard.data.data.result,

  const result = [
    {
      fish_name: "도다리",
      ranked: 0,
      src: photo,
      size: 30,
      createdAt: "2022-01-20",
      fishId: 3,
    },
    {
      fish_name: "숭어",
      ranked: 1,
      src: photo,
      size: 32,
      createdAt: "2022-01-20",
      fishId: 6,
    },
    {
      fish_name: "홍어",
      ranked: 0,
      src: photo,
      size: 20,
      createdAt: "2022-01-23",
      fishId: 11,
    },
    {
      fish_name: "광어",
      ranked: 1,
      src: photo,
      size: 55,
      createdAt: "2022-02-07",
      fishId: 40,
    },
    {
      fish_name: "도다리",
      ranked: 1,
      src: photo,
      size: 45,
      createdAt: "2022-02-20",
      fishId: 2,
    },
  ];

  const navigate = useNavigate();
  const goHome = () => {
    alert("로그인을 하세요");
    navigate("/login");
  };

  const load = () => {
    if (loading === false) {
      return (
        <>
          <LoadingPage />
        </>
      );
=======
    // 페이지네이션
    useEffect(() => {
        start()
    }, [page])  
    
    // 삭제할때 필요함(fishList에서 상태변경됨)
    useEffect(() => {
    if(userInfo.isLogin === true) {
        fishBoard(userInfo.email, page, userInfo.accessToken)
        setTimeout(() => {setLoading(!false)}, 3000)  
    }      
    },[render])  
   
    //console.log(myFishBoard.data.data.realResult,'🌺')
   // const dd = myFishBoard.data.data.result,
   
   
       


    const result = [
        {fish_name: '도다리',ranked:0, src: photo, size: 30, createdAt:'2022-01-20', fishId:3 },
        {fish_name: '숭어',ranked:1, src: photo, size: 32, createdAt:'2022-01-20', fishId:6  },
        {fish_name: '홍어',ranked:0, src: photo, size: 20, createdAt:'2022-01-23', fishId:11 },
        {fish_name: '광어',ranked:1, src: photo, size: 55, createdAt:'2022-02-07', fishId: 40 },
        {fish_name: '도다리',ranked:1, src: photo, size: 45, createdAt:'2022-02-20', fishId:2}
    ]   

    const navigate = useNavigate();
    const goHome = () => {
        
        alert('로그인을 하세요')
        navigate('/login')
    }    
        
    const load = () => {
        if(loading === false) {
            return <Div><LoadingPage /></Div> 
        }
        return <>
            <Modal text='회원님이 잡은 물고기 목록을 볼 수 있습니다.'/>
            <Div>   
                <Title>
                    <div><Link to='/record' style={{ textDecoration: 'none', color:'#0E3B5B',fontWeight:'bolder' }}>기록하기<FontAwesomeIcon icon={faClipboard} /></Link></div>
                </Title>
                {fishboardData()}
            </Div>
        </>
        }

        const fishboardData = () => {
        if(userInfo.isLogin === false) {
            return <>
               
                <Container>
                {result.map(el => <FishList key={el.fishId} {...el} />)} 
                </Container>
                    <Pagenation>
            
                        <Page onClick={goHome}>1</Page>
                        <Page onClick={goHome}>2</Page>
                        <Page onClick={goHome}>3</Page>
                        <Page onClick={goHome}>4</Page>
                        <Page onClick={goHome}>5</Page>
            
                    </Pagenation>
                </>
        } else {
                if (myFishBoard.data === []) {
                    return <h3>기록하신 정보가 없습니다.</h3>
                } 
                else if (myFishBoard.data.data.realResult) {
                    return <> 
                        <Container> 
                            {myFishBoard.data.data.realResult.map(el => <FishList key={el.fishId} {...el} render={render} rerender={rerender}/>)}
                        </Container> 
                        <Pagenation>
                        
                            <Page onClick ={() => setPage(1)}>1</Page>
                            <Page onClick={() => setPage(2)}>2</Page>
                            <Page onClick={() => setPage(3)}>3</Page>
                            <Page onClick={() => setPage(4)}>4</Page>
                            <Page onClick={() => setPage(5)}>5</Page>
                        
                        </Pagenation>
                    </>
                }
        }
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
    }
    return (
<<<<<<< HEAD
      <>
        <Modal text="회원님이 잡은 물고기 목록을 볼 수 있습니다." />
        <Div>
          <Title>
            <h1>나의 월척~</h1>
            <Btn>
              <Link
                to="/record"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bolder",
                }}
              >
                기록하기
              </Link>
            </Btn>
          </Title>
          {fishboardData()}
        </Div>
      </>
    );
  };

  const fishboardData = () => {
    if (userInfo.isLogin === false) {
      return (
        <>
          <Container>
            <h2>사진</h2>
            <h2>물고기 이름</h2>
            <h2>사이즈(cm)</h2>
            <h2>날짜</h2>
            <h2>
              <FontAwesomeIcon
                icon={faCrown}
                size="2x"
                color="gold"
                color="gold"
              />
            </h2>
            <h2>수정/삭제</h2>
          </Container>
          {result.map((el) => (
            <FishList key={el.fishId} {...el} />
          ))}
          <Pagenation>
            <Page onClick={goHome}>1</Page>
            <Page onClick={goHome}>2</Page>
            <Page onClick={goHome}>3</Page>
            <Page onClick={goHome}>4</Page>
            <Page onClick={goHome}>5</Page>
          </Pagenation>
        </>
      );
    } else {
      if (myFishBoard.data === []) {
        return <h3>기록하신 정보가 없습니다.</h3>;
      } else if (myFishBoard.data.data.realResult) {
        return (
          <>
            <Container>
              <h2>사진</h2>
              <h2>물고기 이름</h2>
              <h2>사이즈(cm)</h2>
              <h2>날짜</h2>
              <h2>
                <FontAwesomeIcon icon={faCrown} size="2x" color="gold" />
              </h2>
              <h2>수정/삭제</h2>
            </Container>
            {myFishBoard.data.data.realResult.map((el) => (
              <FishList
                key={el.fishId}
                {...el}
                render={render}
                rerender={rerender}
              />
            ))}

            <Pagenation>
              <Page onClick={() => setPage(1)}>1</Page>
              <Page onClick={() => setPage(2)}>2</Page>
              <Page onClick={() => setPage(3)}>3</Page>
              <Page onClick={() => setPage(4)}>4</Page>
              <Page onClick={() => setPage(5)}>5</Page>
            </Pagenation>
          </>
        );
      }
    }
  };

  return <div>{load()}</div>;
=======
        <>
       <Background>
           {load()}
 
       </Background>
           <Footer/>
        </>   
    )
>>>>>>> 634c38c187e51c8d9cc0167fb29fdd460488dca3
}

const mapStateToProps = (state) => {
  // console.log(state,'88888')
  return {
    userInfo: state.userReducer,
    myFishBoard: state.fishBoardReducer,
  };
};

const mapDispatchToProps = {
  fishBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(FishBoard);
