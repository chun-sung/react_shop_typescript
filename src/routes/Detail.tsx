import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tab from '../component/Tab'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cart'
import { RootState } from '../store/user'
import { RootState2 } from '../store/cart'
import MarginTop from "../component/MarginTop";
import axios from "axios";

export interface Shoes {
    id: number;
    shoes_img: string;
    title: string;
    content: string;
    price: number;  
    count: number;
    checked: boolean;
    user_id: string;
  }

function Detail({shoes, setShoes, eCart, setEcart} :{shoes :Shoes[], setShoes:Function, eCart:boolean, setEcart: Function }) {

    let user = useSelector((state :RootState) => state.user);
    let cart = useSelector((state :RootState2) => state.cart);
    
    let [tab, setTab] = useState(0);
    let [alert, setAlert] = useState(true);
    let [fade, setFade] = useState('');
    
    let navigate = useNavigate();
    let dispatch = useDispatch();
    
    let { id } = useParams<{ id: string }>();   

    console.log('id 값', id)                     // 1
    console.log('id 의 타입',typeof id)          // string
    //findProduct {id: 1, shoes_img: '/img/shoes2.jpg', title: 'Red Knit', content: 'Born in Seoul', price: 120000, …}
    
    
    let findProduct :any = shoes.find(function(x :any){
        return x.id === id 
    });      
    let copy = {...findProduct}                      // ★★★ 객체의 깊은 복사를 해야 한다.
    copy.count = 1;
    copy.checked = false;    
    copy.user_id = user.user_id;    
    findProduct = copy;

    console.log('Shoes',shoes);
    console.log('findProduct', findProduct)   // findProduct {count: 1, checked: false, user_id: ''}   *id 없음

    useEffect(()=> {
        window.scrollTo(0,0)                                // 최상단 이동
        setFade('end')
        return () => setFade('')
    },[])

    useEffect(()=> {
        setTimeout(()=>{
            setAlert(false)
        }, 2500)
    },[alert])

    useEffect(()=>{
        let 꺼낸거 :string|null|string[] = localStorage.getItem('watChed');
        if(typeof 꺼낸거 == 'string') {
            꺼낸거 = JSON.parse(꺼낸거);                      // Array로 변환
        }
        if(꺼낸거 != null) {
            if(typeof 꺼낸거 != 'string')
            꺼낸거.unshift(findProduct.id);
        }

        // 꺼낸거 = new Set(꺼낸거)                          // 중복 제거
        // 꺼낸거 = Array.from(꺼낸거)
        // localStorage.setItem('watChed', JSON.stringify(꺼낸거))        
    });    

    return (<>
        <MarginTop />
        <div className={"container start " +fade } style={{height: '700px'}}>            
            <div className="row">
                <div className="col-md-6">
                {/* <img src={"https://codingapple1.github.io/shop/shoes"+(findProduct.id + 1)+ ".jpg"} width="100%" alt="shoes" /> */}
                <img src={"https://www.springstar.shop/img/shoes/shoes"+(findProduct.id + 1)+ ".jpg"} width="100%" alt="shoes" />
                </div>
                <div className="col-md-6">
                {/* <h4 className="pt-5">{shoes[id]?.title}</h4>
                <p>{shoes[id].content}</p>
                <p>{shoes[id].price}</p>              */}
                <button className="btn btn-primary order mb-3" onClick={()=>{                    
                   user.nickName 
                //    ? dispatch((addItem(findProduct))) 
                   ? axios.post('https://www.springstar.shop/addcart', findProduct)
                     .then((res => {
                        if(res.data.msg === 'success') {
                            window.alert('장바구니에 담았습니다.'); 
                            setEcart(!eCart)
                        } else if(res.data.msg === 'fail') {
                            window.alert('장바구니에 포함된 상품 입니다.'); 
                            // console.log(res.data.msg)
                        }
                     }))
                   : window.alert('로그인후 이용가능 합니다.')
                }}>장바구니 담기</button>

                {user.nickName ? 
                    <button className="btn btn-danger order mb-3 ms-2" onClick={()=> {navigate('/cart');
                        }}>장바구니 이동
                    </button> : null
                }

                </div>
            </div>
            <Tab tab={tab} setTab={setTab} />
                {
                  alert === true ? <div className="alert alert-danger mt-5">3초 이내 구매시 공짜!</div> : null
                }
        </div>    
    </>)
}

export default Detail;

