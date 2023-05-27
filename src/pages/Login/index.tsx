import "./styles.css";
import "../Signup";
// import { setCookie, getCookie, removeCookie } from "../../service/cookie/cookie";
import {useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from './../../components/GoogleLogin';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../components/firebase";
import { useCookies } from "react-cookie";

function Login() {
    const navigate = useNavigate();
    
    const [errMsg, setErrMsg] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();
    
    function submit(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        const res = signInWithEmailAndPassword(auth, email, password).then(
            (UserCredential) => {
                const user = UserCredential.user;
                setCookie('uidToken', user.uid);
                // localStorage.setItem('uid', user.uid);
                navigate('/');
            }
        ).catch((error)=>{console.log(error)});
    }

    const idFocusRef = useRef<HTMLInputElement>(null);
    const pwFocusRef = useRef<HTMLInputElement>(null);
   
    useEffect(() => { //렌더링이 될 떄 마다 실행되는 함수
        idFocusRef.current?.focus();
        
    }, []);
    
    const inputHandler = (e: any) => {
       
        if (e.target.className === 'id_input') {
            pwFocusRef.current?.focus();
        }
        else if (e.target.className === 'pw_input') {
            submit(e);
            // alert('login');
        }
    }

    return(
        <div className="Login">
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">로그인</h1>

                <div className="login_form">
                    <input className="id_input" type="text" placeholder="email"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { inputHandler(e) } }}
                        ref={ idFocusRef }></input>
                    <input className="pw_input" type="password" placeholder="password"
                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { inputHandler(e) } }}
                        ref={ pwFocusRef}></input>
                    <p style={{color:"red", height:"22px"}}>{errMsg && errMsg}</p>
                    <button className="submit" onClick={(e)=>{submit(e)}}>로그인</button>                   
                </div>

                <p style={{ color: "gray", whiteSpace: "pre" }}>
                    <a href="" style={{ textDecoration: "none", color: "gray" }}>ID 찾기</a>
                    <a href="" style={{ textDecoration: "none", color: "gray" }}> | 비밀번호 찾기</a>
                    <a href="" style={{ textDecoration: "none", color: "gray" }} onClick={() => { navigate('/signup'); }}> | 회원가입</a>
                </p>
                <GoogleLogin width="340px" text="Sign in with Google" />
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Login;