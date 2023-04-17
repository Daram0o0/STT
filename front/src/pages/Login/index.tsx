import "./styles.css";
import "../Signup";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from './../../components/GoogleLogin';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../components/firebase";

function Login(){
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submit(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        const res = signInWithEmailAndPassword(auth, email, password).then(
            (UserCredential) => {
                const user = UserCredential.user;
                localStorage.setItem('uid', user.uid);
                navigate('/');
            }
        );
        
    }

    return(
        <div className="Login">
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">로그인</h1>

                <div className="login_form">
                    <input className="id_input" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                    <input className="pw_input" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <p style={{color:"red", height:"22px"}}>{errMsg && errMsg}</p>
                    <button className="submit" onClick={(e)=>{submit(e)}}>로그인</button>                   
                </div>

                <p style={{color:"gray", whiteSpace:"pre"}}>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>ID 찾기</a>
                    <a href="" style={{textDecoration:"none",color:"gray"}}> | 비밀번호 찾기</a> 
                    <a href="" style={{textDecoration:"none",color:"gray"}} onClick={()=>{navigate('/signup');}}> | 회원가입</a>
                </p>
                <GoogleLogin width="340px" text="Sign in with Google"/>
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Login;