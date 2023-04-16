import "./styles.css";
import "../Signup";
import { useNavigate } from "react-router-dom";
import GoogleLogin from './../../components/GoogleLogin';

function Login(){
    const navigate = useNavigate();

    return(
        <div className="Login">
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">로그인</h1>

                <div className="login_form">
                    <input className="id_input" type="text"></input>
                    <input className="pw_input" type="password"></input>
                    <br/><br/>

                    <button className="submit">로그인</button>                   
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