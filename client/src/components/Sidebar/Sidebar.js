import React from 'react'
import { useRef} from 'react'
import { NavLink} from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarOff  } from '../../redux/store/actions';
import { useEffect } from 'react';

const Container = styled.div`

  background-color: #D8D7D8;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  height: 100vh;
  top: 0;
  border-bottom: 1px solid red;
  display: ${props => props.btnClicked ? 'block' : 'none'};
`

const Div = styled.div`
  border: dotted red 2px;
<<<<<<< HEAD
  flex-direction: column;
  width:30%
=======
  margin: 10px 0px;
  display: block;
>>>>>>> 3b4c694002c54a849ccd898d9039b24179a0e439
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 1rem 0;
  text-decoration: none;
  transition: background-color, color 100ms ease-out;
  color: #2AA1B7;
  font-size: 16px;

  :hover {
    color: antiquewhite;
    background-color: #2AA1B7;
  }
`
const Menu = styled.div`
    ${Div} :hover & {
        color: #F3B178;
        background-color: #2AA1B7;
    }
    font-size: 20px;
`


const Sidebar = ({btn, setBtn}) => {
    const { isLogin, nickname,} =  useSelector(({ userReducer }) => userReducer);
    const dispatch = useDispatch();
    const side = useRef();
    
    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async e => {
      let sideArea = side.current;
      let sideCildren = side.current.contains(e.target);
      if ( btn && (!sideArea || !sideCildren)) {
        dispatch(sideBarOff);
        setBtn(false)
        console.log(btn,'사이드바 버튼')
      }
    }
  
    useEffect(()=> {
      window.addEventListener('click', handleClose);
      return () => {
        window.removeEventListener('click', handleClose);
      };
    });

    return (
        <Container btnClicked={btn} ref={side}>
            <Div>
                {
                  isLogin === true ?
                  <div>{nickname}님 반갑습니다</div> 
                  :
                  <Menu>
                      <StyledNavLink to='/login'>로그인</StyledNavLink>
                  </Menu>
                }
                <Menu>
                    <StyledNavLink to='/mypage'>마이페이지</StyledNavLink>
                </Menu>
                <Menu>
                    <StyledNavLink to='/fishdata'>물고기정보</StyledNavLink>
                </Menu>
                <Menu>
                    <StyledNavLink to='/closedseason'>금어기</StyledNavLink>
                </Menu>
                <Menu>
                    <StyledNavLink to='/checklist'>체크리스트</StyledNavLink>
                </Menu>
            </Div>
        </Container>
    )
}

export default Sidebar
