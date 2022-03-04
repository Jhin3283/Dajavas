import React from 'react'
import { useState, useRef, useEffect} from 'react'
import { Link, NavLink} from 'react-router-dom'
// import styles from './sidebar.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars  } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`

  background-color: #D8D7D8;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  height: 1000vh;
  /* position: sticky; */
  top: 0;
  width: 20vw;
  /* border-bottom: 1px solid red; */
  /* z-index: 10; */
  /* text-decoration: none; */

`

const Div = styled.div`
  border: dotted red 2px;
  margin: 10px 0px;
  /* display: block; */
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: none;
  /* transition: background-color, color 100ms ease-out; */

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
`


const Sidebar = () => {
    const { isLogin, login_method, email, nickname, password, accessToken } =  useSelector(({ userReducer }) => userReducer);

    const [isOpen, setOpen] = useState(false);
    // const [xPosition, setX] = useState(width);
    const side = useRef();
    
    // button 클릭 시 토글
    // const toggleMenu = () => {
    //   if (xPosition > 0) {
    //     setX(0);
    //     setOpen(true);
    //   } else {
    //     setX(width);
    //     setOpen(false);
    //   }
    // };
    
    // 사이드바 외부 클릭시 닫히는 함수
    // const handleClose = async e => {
    //   let sideArea = side.current;
    //   let sideCildren = side.current.contains(e.target);
    //   if (isOpen && (!sideArea || !sideCildren)) {
    //     await setX(width); 
    //     await setOpen(false);
    //   }
    // }
  
    // useEffect(()=> {
    //   window.addEventListener('click', handleClose);
    //   return () => {
    //     window.removeEventListener('click', handleClose);
    //   };
    // })
  

    return (
        <Container>
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
