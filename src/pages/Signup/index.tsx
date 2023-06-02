import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from './../../service/tableDB';
import './styles.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import GoogleLogin from './../../components/GoogleLogin';
import Header from '../../components/Header';

function Signup() {
    const navigate = useNavigate();

    const id_input = useRef<HTMLInputElement>(null);
    const pw_input = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState("");
    const [nickname, setNickname] = useState("");

    const onSubmit = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e?.preventDefault();

        console.log("회원가입 시도");
        console.log(auth.currentUser);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("create user!");
            createUser(res.user.uid, nickname);
            navigate('/login');
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="Signup">
            <Header />
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">회원 가입</h1>

                <div className="signup_form">
                    <input className="nickname_input" value={nickname}
                        placeholder='nickname'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                id_input.current?.focus();
                            }
                        }}
                        onChange={(e) => {
                            setNickname(e.target.value);
                        }}></input>
                    <input className="id_input" ref={id_input} value={email} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            pw_input.current?.focus();
                        }
                    }} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='email'></input>
                    <input className="pw_input" ref={pw_input} value={password} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit();
                        }
                    }} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password'></input>
                    <p style={{ color: "red", height: "22px" }}>{errMsg && errMsg}</p>

                    <button className="submit" onClick={(e) => { onSubmit(e) }}>가입하기</button>
                    <GoogleLogin width="340px" text="Sign in with Google" />
                </div>
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Signup;