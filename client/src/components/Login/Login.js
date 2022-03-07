import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "styled-media-query";
import Wave from "react-wavify";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; //구글 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; //카카오 아이콘
import { GoogleLogin } from "react-google-login";
import { 
  loginAction, 
  logoutAction, 
  updateInfoAction 
} from "../../redux/store/actions";
import userApi from "../../API/user";
// import userReducer from "../../redux/store/reducers/userReducer/userReducer";
import img from '../../img/Wave3.jpg'
import Footer from "../Footer/Footer";

const Container = styled.div`
  width: 100vw;
  height: 100%;
`;
const GenBtn = styled.div`
  outline: none;
  margin: 0.5rem;
  padding: 1rem;
  width: 7rem;
`

const Div = styled.div`
  padding: 9rem;
  justify-content: center;
  border: 1rem solid yellow;
`
const StyledInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
  width: 15rem;
  padding: 1rem;
  margin: 0.5rem;
`
const Social = styled.div`
  display: inline;
  border: 3px solid yellowgreen;
  padding: 1rem;
  margin: 1rem;
`
const Google = styled.button`
  outline: 0;
  font-weight: 500;
  font-size: 20px;
  border: 0;
  background-color: white;
`
const Text = styled.div`

`

const Kakao = styled.button`
  margin-right: 1rem;
  outline: none;
  border: 0;
  font-weight: 500;
  font-size: 20px;
  background-color: yellow;
  border-radius: 0.4rem;
  padding: 0.7rem;
  /* opacity: 0.7; */
`

function Login({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    //입력값
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState({
    //유효성 검사 통과여부
    email: true,
    password: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { email, nickname, isLogin, id, login_method, accessToken} = useSelector((userReducer)=>userReducer);

  const handleLoginInputValue = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log('버튼 클릭시 인풋 데이터 모음',inputValue);
    if (name === "email") {
      const emailVal =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          value
        );
      setValidated({ ...validated, [name]: emailVal });
    } else if (name === "password") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
      setValidated({ ...validated, [name]: passwordVal });
    }
  }, 200);

  const handleLogin = async (e) => {
    e.preventDefault();
    const valResult = validated.email && validated.password;
    if (valResult) {
      const loginInputValue = { ...inputValue };
      console.log("로그인 인풋벨류", loginInputValue);
      // console.log('이즈로그인',isLogin)
      // console.log('email',email)
      try {
        const res = await userApi.login(loginInputValue);
        // console.log('인풋벨류는??',loginInputValue)

        console.log("응답은 뭐라고 왔나?", res.data.data);
        if (res.status === 200) {
          // console.log('로그인시 저장된 데이터', res);
          console.log("디스패치 전", res.data.data.isLogin);
          dispatch(loginAction(res.data.data));
          console.log(isLogin,'이즈로그인')
          console.log("디스패치 후", res.data.data.isLogin);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("입력하신 내용을 다시 확인해주세요");
      }
    }
  };

  const handleLoginKakao = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
    );
  };

  const handleLoginGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
  };
  const success = async (e) => {
    const a = await userApi.google(e.profileObj, "2");
    console.log("aaaaaaaaa");
    if (a.status === 200) {
      console.log("bbbbbbbbb");
      console.log(a.data.data, "@@@@@@@@");
      dispatch(loginAction(a.data.data));
      navigate("/", { replace: true });
    }
  };
  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <Container>
      <Div>
        <div className="loginInputContainer">
          로그인
          <form id="login">
            <div>
              <StyledInput
                box
                name="email"
                type="text"
                placeholder="이메일"
                autoComplete="username"
                onChange={handleLoginInputValue}
              />
            </div>
            <div>
              <StyledInput
                name="password"
                type="password"
                placeholder="비밀번호"
                autoComplete="current-password"
                onChange={handleLoginInputValue}
              />
            </div>
          </form>
          <button onClick={handleLogin}>로그인</button>
        </div>
        <Social>
          <Kakao className="kakao" onClick={handleLoginKakao}>
            <RiKakaoTalkFill/>
            카카오로 로그인
          </Kakao>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_REST_KEY}
            responseType={"id_token"}
            onSuccess={success}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          >
            <Google>구글로 로그인</Google>
          </GoogleLogin>
        </Social>
        <Text>아직 아이디가 없으신가요?</Text>
        <GenBtn>
          <button onClick={() => navigate("/", { replace: false })}>홈으로</button>
          <button onClick={() => navigate("/signup", { replace: false })}>
            회원가입
          </button>
        </GenBtn>
        <div>{errorMessage}</div>
      </Div>
      <Wave
        fill = '#1277b0'
        paused={false}
        options={{
            height: 10,
            amplitude: 18,
            speed: 0.30,
            points: 8
        }}
      />
      <Footer/>
    </Container>
  );
}
export default Login;
