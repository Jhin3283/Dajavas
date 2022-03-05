import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.png'
import Sidebar from '../Sidebar/Sidebar';
//import logo from '../../img/fishmarker.png'



const Container = styled.div`
    display: flex;
    box-shadow: 0 10px 30px #3c4a5645;
    opacity: 5;
`

const Navi = styled.nav`
    display:flex;
    color: #92BBFF;
    padding:0 3vw;
    background-color: white;
    flex: 1 1 auto;
`

const Div = styled.div`
    font-size: 1.4rem;
    display: flex;
    align-items:center;
    margin-right:2rem;
    padding: 10px;
    border-radius: 40%;

    &:hover{
        cursor: pointer;
        background-color: rgb(222, 247, 243);
    }
   
    
    
`
const Menu = styled.div`
    display:flex;
    justify-content: flex-end;
    align-items: center;
    background-color: white;
    
    
`

function Nav () {
    return (
        <Container>
            <Navi>
                        
                <div>
                <div><Link to='/'><img src={logo} alt="logo" style={{width:200, height:67,color:'black' }} /></Link></div>
                </div> 
            </Navi>   
            <Menu>
                <Div><Link to='/ranking' style={{ textDecoration: 'none', color: '#04A1A1',fontWeight:'bolder'}}><div>랭킹</div></Link></Div>
                <Div><Link to='/fishboard' style={{ textDecoration: 'none',color:'#04A1A1',fontWeight:'bolder'}}><div>기록</div></Link></Div>
                <Div><Link to='/map' style={{ textDecoration: 'none',color:'#04A1A1',fontWeight:'bolder'}}><div>지도</div></Link></Div>
                <Div><Link to='/map' style={{ textDecoration: 'none',color:'#04A1A1',fontWeight:'bolder'}}><FontAwesomeIcon icon={faBars}/></Link></Div>
            </Menu>
        </Container>
    )
}

export default Nav
