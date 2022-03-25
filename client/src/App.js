import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Ranking from "./components/Nav/Ranking/Ranking";
import Map from "./components/Nav/Map/Map";
import FishBoard from "./components/Nav/FishBoard/FishBoard";
import FishData from "./components/Sidebar/FishData";
import ClosedSeason from "./components/Sidebar/ClosedSeason";
import CheckList from "./components/Sidebar/CheckList";
import MyPage from "./components/Sidebar/MyPage";
import BoardContent from "./components/Nav/FishBoard/BoardContent";
import ErrorPage from "./ErrorPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import UpdateFish from "./components/Nav/FishBoard/UpdateFish";
import styled from "styled-components";
import { useState } from "react";

const Box = styled.div`
  display: flex; 
  width: 100vw;
  height:130vh;
  display: flex;
  flex: 2 auto; 
`;

const Container = styled.div`
  /* width: 100vw; */
`;

const Div = styled.div`
  width: ${props => props.btnClicked ? '90vw' : '100vw'};
`;

const Sidediv = styled.div``;

//   display: flex;
//   width: 100vw;
//   /*  width: ${(props) => (props.dev ? "100vw" : "100vw")}; */
//   height: 130vh;
//   /* width: 100vw;
//    display: flex;
//   flex: 2 auto; */
// `;

// const Container = styled.div`
//   width: 100%;
// `;

// const Divs = styled.div`
//   flex: 1 1 auto;
// `;
// const Div = styled.div`
//   flex: 1 1 auto;
// `;

function App() {
  const [btn, setBtn] = useState(false);
  console.log(btn, "ddddd");

  return (
    <Container className="App">
      <Router>
        <Box>
          <Div btnClicked={btn}>
            <Nav setBtn={setBtn} btn={btn}/>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/ranking" element={<Ranking />} />
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/fishboard" element={<FishBoard />} />
              <Route exact path="/fishdata" element={<FishData />} />
              <Route exact path="/closedseason" element={<ClosedSeason />} />
              <Route exact path="/checklist" element={<CheckList />} />
              <Route exact path="/mypage" element={<MyPage />} />
              <Route exact path="/record" element={<BoardContent />} />
              <Route exact path="/errorpage" element={<ErrorPage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/updatefish" element={<UpdateFish />} />
            </Routes>
          </Div>
          <Sidediv>
            <Sidebar setBtn={setBtn} btn={btn}/>
          </Sidediv>
        </Box>
      </Router>
    </Container>
  );
}

export default App;
