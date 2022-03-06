import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "styled-media-query";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fa"; //구글 아이콘
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
const Container = styled.div`

`;

const Wave = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  background-image: url('../../img/Wave3.jpg');
  background-position: bottom;
  background-size: cover;
`

const Div = styled.div`
  /* display: flex; */
  background-color: #FFFAFA;
  /* background-color: #88BECE; */
  /* background-color: #D8D7D8; */
  /* background-color: #F3B178; */
  /* background-color: #F9B10B;  */
  /* background-color: #2AA1B7; */


`
const StyledInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
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
  const success = async (res) => {
    console.log(res.profileObj);
  };
  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <Container>
      <Div>
        <div className="loginInputContainer">
          login
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
        <button className="google" onClick={handleLoginGoogle}>
          구글로 로그인
        </button>
        <button className="kakao" onClick={handleLoginKakao}>
          카카오로 로그인
        </button>
        <button onClick={() => navigate("/", { replace: false })}>홈으로</button>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_REST_KEY}
          buttonText={"Login with Google"}
          responseType={"id_token"}
          onSuccess={success}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
        <div>아직 아이디가 없으신가요?</div>
        <button onClick={() => navigate("/signup", { replace: false })}>
          회원가입
        </button>
        <div>{errorMessage}</div>
      </Div>
      <Wave >
        웨이브
      </Wave>
    </Container>
  );
}
export default Login;
