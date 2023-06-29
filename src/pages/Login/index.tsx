import "./styles.css";
import "../Signup";
// import { setCookie, getCookie, removeCookie } from "../../service/cookie/cookie";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from './../../components/GoogleLogin';
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "./../../components/firebase";
import { createUser } from './../../service/tableDB';
import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import { ErrorCallback } from "typescript";

function Login() {
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();

    function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const res = signInWithEmailAndPassword(auth, email, password).then(
            (UserCredential) => {
                const user = UserCredential.user;
                setCookie('uidToken', user.uid);
                // localStorage.setItem('uid', user.uid);
                navigate('/');
            }
        ).catch((err: AuthError) => {
            let errStr = err.code.toString();
            if (errStr == "auth/network-request-failed") {
                setErrMsg("인터넷이 연결되지 않았습니다.");
            } else if (errStr == "auth/wrong-password") {
                setErrMsg("잘못된 비밀번호입니다.");
            } else if (errStr == "auth/user-not-found") {
                setErrMsg("존재하지 않는 사용자입니다. 회원가입을 해주십시오.")
            } else if (errStr == "auth/invalid-email") {
                setErrMsg("유효하지 않은 이메일입니다.");
            }
            else {
                setErrMsg(errStr);
            }
            console.log("error : ", err.code.toString());
        });
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


    return (
        <div className="Login">
            <Header />
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">로그인</h1>

                <div className="login_form">
                    <input className="id_input" type="text" placeholder="email"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        onFocus={(e) => {
                            let t = email;
                            setEmail("");
                            setEmail(t);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputHandler(e)
                            } else if (e.key === 'ArrowDown') {
                                pwFocusRef.current?.focus();
                            }
                        }}
                        ref={idFocusRef}></input>
                    <input className="pw_input" type="password" placeholder="password"
                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                        onFocus={(e) => { e.currentTarget.selectionStart = password.length }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                inputHandler(e);
                            }
                            else if (e.key === 'ArrowUp') {
                                idFocusRef.current?.focus();
                                if (idFocusRef.current) {
                                    // console.log(email.length);
                                    idFocusRef.current.selectionStart = email.length;
                                }
                            }
                        }}
                        ref={pwFocusRef}></input>
                    <p style={{ color: "red", height: "22px" }}>{errMsg && errMsg}</p>
                    <button className="submit" onClick={(e) => { submit(e) }}>로그인</button>
                </div>

                <p style={{ color: "gray", whiteSpace: "pre" }}>
                    <a style={{ textDecoration: "none", color: "gray" }}>ID 찾기</a>
                    <a style={{ textDecoration: "none", color: "gray" }}> | 비밀번호 찾기</a>
                    <a style={{ textDecoration: "none", color: "gray" }} onClick={(e) => { navigate('/signup'); }}> | 회원가입</a>
                </p>
                <GoogleLogin width="340px" text="Sign in with Google" />
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Login;