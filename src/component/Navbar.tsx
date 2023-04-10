import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { RootState, logout } from '../store/user';
import './Navbar.css'

function CollapsibleExample() {

    let user = useSelector((state :RootState)=>  state.user );
    let navigate = useNavigate();
    let dispatch = useDispatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand className='rt' onClick={()=> navigate('/')}>StarMall</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='#' onClick={()=> navigate('/man')}>남성용품</Nav.Link>
            <Nav.Link href='#' onClick={()=> navigate('/wooman')}>여성용품</Nav.Link>
            <Nav.Link href='#' onClick={()=> navigate('/living')}>생활용품</Nav.Link>
            <Nav.Link href='#' onClick={()=> navigate('/cart')}>장바구니</Nav.Link>
            <Nav.Link href='#' onClick={()=> navigate('/board')}>고객 게시판</Nav.Link>
            <Nav.Link href='#' onClick={()=> navigate('/member')}>회원 가입</Nav.Link>
          </Nav>
          {
                    user.nickName !== undefined 
                    ? <Nav.Link href="#" className='user logo' style={{color: 'palevioletred', marginLeft: '10px'}} onClick={()=>{navigate('/mypage')}}> {user.nickName +' 님'}</Nav.Link>
                    : <Nav.Link href="#login" style={{color: 'black'}} onClick={()=>{navigate('/login')}}>login</Nav.Link>
                }
                {
                    user.nickName !== undefined ?
                        <Nav.Link href="#" onClick={()=>{
                            let choice = window.confirm('로그아웃 하시겠습니까?')                        
                            if(choice === true) {
                                localStorage.removeItem('springStar');
                                localStorage.removeItem('springStar_nick');
                                localStorage.setItem('watChed', JSON.stringify([]));
                                axios({
                                    url:"https://www.springstar.shop/logout2",  // 서버에서 토큰 초기화:  res.cookie('accessToken', '');  
                                    method: "POST",
                                    withCredentials: true,
                                }).then((res) => {
                                    if(res.status === 200) {
                                        dispatch(logout({}));
                                        navigate('/');
                                    }
                                })
                            }
                            }}>
                            <span style={{color: 'grey', marginLeft: '10px'}}>logout</span>
                        </Nav.Link>
                    : null
                }
        </Navbar.Collapse>
      </Container>      
    </Navbar>
  );
}

export default CollapsibleExample;