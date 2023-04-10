import './App.css';
import Navbar from './component/Navbar'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Footer from './component/Footer'
import axios from 'axios';
import MainBg from './component/MainBg';
import { useEffect, useState } from 'react';
import Main from './component/Main';
import Event from './component/Event';
import Event1 from './component/event/Event1';
import Event2 from './component/event/Event2';
import MobileBottomMenu from './component/MobileBottomMenu';
import MobileTopMenu from './component/MobileTopMenu';
import Login from './routes/Login';
import NotFound from './routes/NotFound'
import NotAccess from './routes/NotAccess';
import MarginBottom from './component/MarginBottom';
import Detail from './routes/Detail';
import Mypage from './routes/Mypage';
import { Shoes } from './routes/Detail';

function App() {

  // let [shoes , setShoes] = useState<[]>([]);     // 제네릭 문법으로 [ ] 배열 할당 (이렇게 않하면 never[] 네버가 담긴 배열이 된다.)
  let [shoes , setShoes] = useState([{id: 0, shoes_img:'', title:'', content:'', price: 0, count: 0, checked:false, user_id:''}]);
  let [eCart, setEcart] = useState(false);       
  let [eCoupon, setEcoupon] = useState(false);       

  let navigate = useNavigate();
  // login/success 로 요청을 보내는 로직(토큰 전송 /사용자 구분)
  
  
  // 최근 조회 상품 정보 초기화 
  useEffect(()=> {                
      localStorage.setItem('watChed', JSON.stringify([]))  
  },[])     

  return (
    <div className="App nexon">    
      <MobileTopMenu />  
      <Navbar />      
      <Routes>
        <Route path='/' element={
          <>
            {/* <MainBg shoes={shoes} /> */}
            <MainBg  {...shoes} />
            <Main shoes={shoes} setShoes={setShoes} />
            <div className='main-bg small' />           
            <Footer />
           
          </>}/>
        <Route path='/detail/:id'  element={ <Detail shoes={shoes} setShoes={setShoes} eCart={eCart} setEcart={setEcart}/>}/>
        <Route path='/man'        element={ <h1 className='mt-3'>남성 정장 페이지</h1>                  }/>    
        <Route path='/wooman'     element={ <h1 className='mt-3'>여성 정장 페이지</h1>                  }/>    
        <Route path='/living'     element={ <h1 className='mt-3'>리빙 페이지</h1>                       }/>    
        <Route path='/cart'       element={ <h1 className='mt-3'>장바구니</h1>                          }/>    
        <Route path='/board'      element={ <h1 className='mt-3'>고객 게시판</h1>                       }/>    
        <Route path='/member'     element={ <h1 className='mt-3'>회원 가입</h1>                         }/>    
        <Route path='/login'      element={ <Login />                                                  }/>    
        <Route path='/mypage'      element={ <Mypage />                                                }/>
        <Route path='*'           element={<h1 className='mt-3'>페이지를 찾을 수 없습니다.</h1>          }/>

        {/* Nested Routes */}
        <Route path='/event'      element={ <Event />                                                   }>
          <Route path='one'       element={ <Event1 eCoupon={eCoupon} setEcoupon={setEcoupon}/>         }/>
          <Route path='two'       element={ <Event2 eCoupon={eCoupon} setEcoupon={setEcoupon}/>         }/>                
        </Route> 

        {/* 404Page */}
        <Route path='*'           element={ <NotFound />                                                }/>
      </Routes>

      <MarginBottom />    
      <MobileBottomMenu />
    </div>

  );
}
export default App;