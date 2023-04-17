import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './styles.css';
import { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';

function Signup(){
    const navigate = useNavigate();

    const id_input = useRef<HTMLInputElement>(null);
    const pw_input = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState("");

    const onSubmit = async (e? : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e?.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Signed in
                const user = userCredential.user;
                console.log(user);
                alert("회원 가입이 완료되었습니다!");
                navigate("/login");
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMsg = err.message;
                console.log(errorCode, errorMsg);
                setErrMsg(errorCode);
                switch (errorCode){
                    case 'auth/invalid-email':
                        setErrMsg("잘못된 이메일 형식입니다.");
                        break;
                    case 'auth/weak-password':
                        setErrMsg("비밀번호는 최소 6자 이상이어야 합니다.");
                        break;
                }
            })
    }

    return (
        <div className="Signup">
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">회원 가입</h1>

                <div className="signup_form">
                    <input className="id_input" ref={id_input} value={email} onKeyDown={(e)=>{
                        if (e.key === 'Enter'){
                            id_input.current?.blur();
                            pw_input.current?.focus();
                        }
                    }} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='email'></input>
                    <input className="pw_input" ref = {pw_input} value={password} onKeyDown={(e)=>{
                        if (e.key === 'Enter'){
                            onSubmit();
                        }
                    }} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password'></input>
                    <p style={{color:"red"}}>{errMsg && errMsg}</p>
                    <br/><br/>

                    <button className="submit" onClick={(e)=>{onSubmit(e)}}>가입하기</button>  
                                     
                </div>
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Signup;