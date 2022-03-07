import React from "react";
import { useState } from "react";
import styled from "styled-components";
import media from "styled-media-query";
import debounce from "lodash/debounce";
import { FcGoogle } from "react-icons/fc"; //구글 아이콘
import { RiKakaoTalkFill } from "react-icons/ri"; //카카오 아이콘
import { useNavigate } from "react-router-dom";
import Wave from "react-wavify";
import { GoogleLogin } from "react-google-login";
import fishingImg  from '../../img/낚시이미지.png';
import { loginAction } from "../../redux/store/actions";
import userApi from "../../API/user";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vw;
`
const SignupWraper = styled.div`
  padding: 5rem;
`
const SignupInput = styled.input`
  outline: none; /* outline 테두리 없애기 */
  border:0 ;
  background-color: #E8F0FE;
  border-radius: 0.5rem;
  width: 15rem;
  padding: 1rem;
  margin: 0.5rem;
`

const SignupBtn = styled.button`
  
`
const Social = styled.div`
  margin: 0.5rem;
  padding: 1rem;
`
const BtnDiv = styled.div`
  /* outline: none;
  margin: 0.5rem;
  padding: 1rem;
  width: 7rem;
  display: flex;
  justify-content: center; */
`

// const FishingImg = styled.img`
//   display: flex;
//   width: 10rem;
  
// `

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    //입력값
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    login_method: 0,
  });

  const [validated, setValidated] = useState({
    //유효성 검사 통과여부
    email: true,
    nickname: true,
    password: true,
    passwordCheck: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isOnVerification, setIsOnVerification] = useState(false); //모든항목 유효성 검사 통과여부

  const handleInputChange = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log('제대로 입력값이',inputValue)
    if (name === "email") {
      const emailVal =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          value
        );
      setValidated({ ...validated, [name]: emailVal });
      if (value === "") {
        setErrorMessage("");
      } else if (emailVal) {
        setErrorMessage("");
        try {
          const res = await userApi.checkEmail(value);
          res.status === 200 && setErrorMessage("");
        } catch (err) {
          setErrorMessage("이미 가입된 이메일입니다.");
        }
      } else {
        setErrorMessage("이메일 형식이 올바르지 않습니다.");
      }
    } else if (name === "password") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      /*  조건1. 6~20 영문 대소문자
                조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  
            */
      setValidated({ ...validated, [name]: passwordVal });
      if (value === "") setErrorMessage("");
      else if (passwordVal) {
        setErrorMessage("");
      } else {
        setErrorMessage("6-20글자 숫자 혹은 특수 문자를 포함해야 합니다.");
      }
    } else if (name === "passwordCheck") {
      const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(
        value
      );
      const passwordCheckVal = value === inputValue.password;
      if (value === "") {
        setErrorMessage("");
      } else if (passwordVal && passwordCheckVal) {
        setErrorMessage("");
      } else {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    } else if (name === "nickname") {
      try {
        const res = await userApi.checkNickname(value);
        console.log("응답 왔는가?", res);
        res.status === 200 && setErrorMessage("");
      } catch (err) {
        setErrorMessage("이미 사용중인 닉네임입니다.");
      }
    }
  });

  const handleSignup = async (e) => {
    // e.prevenetDefault(); //에러메시지 1초만에 사라지는 것 방지
    const valResult = Object.values(validated).every((el) => {
      return el === true;
    });
    if (valResult) {
      const signInputValue = { ...inputValue };
      console.log("이메일체크 삭제전", signInputValue);
      delete signInputValue.passwordCheck;
      console.log("이메일체크 삭제후", signInputValue);

      try {
        const res = await userApi.signup(signInputValue);
        res.status === 200 && setIsOnVerification(true);
        navigate("/", { replace: true });
      } catch (err) {
        setErrorMessage("정보를 확인해주세요1");
      }
    } else {
      setErrorMessage("정보를 확인해주세요");
    }
  };

  const handleSignKakao = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
    );
  };

  const handleSignGoogle = () => {
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
      <SignupWraper>
        회원가입
        <form className="SignupInputContainer">
          <div>
            <div>
              <SignupInput
                name="email"
                type="text"
                autoComplete="username"
                placeholder="이메일"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="nickname"
                type="text"
                autoComplete="username"
                placeholder="닉네임"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <SignupInput
                name="passwordCheck"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호 확인"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div>{errorMessage}</div>
        <SignupBtn className="generalSignup" onClick={handleSignup}>
          회원가입
        </SignupBtn>
        <Social>
          <SignupBtn className="google" onClick={handleSignGoogle}>
            <FcGoogle/>
            구글 회원가입
          </SignupBtn>
          <SignupBtn className="kakao" onClick={handleSignKakao}>
            <RiKakaoTalkFill/>
            카카오 회원가입
          </SignupBtn>
        </Social>
        <BtnDiv>
          <button onClick={() => navigate("/", { replace: false })}>홈으로</button>
          <button onClick={() => navigate("/login", { replace: false })}>
            로그인
          </button>
        </BtnDiv>
      </SignupWraper>
      {/* <FishingImg src={fishingImg} alt='fishingImg'/> */}
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
    </Container>
  );
}

export default Signup;
