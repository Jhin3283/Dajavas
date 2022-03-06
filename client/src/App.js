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
  flex: 2 auto;
`;

const Container = styled.div`
  /* width: 100%; */
`;

const Div = styled.div``;


function App() {

  const [btn, setBtn] = useState(false);

  return (
    <Container className="App">
      <Router>
        <Box>
          <Div>
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
          <Div>
            <Sidebar setBtn={setBtn} btn={btn}/>
          </Div>
        </Box>
      </Router>
    </Container>
  );
}

export default App;
