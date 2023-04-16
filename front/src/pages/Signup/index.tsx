import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './styles.css';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';

const provider = new GoogleAuthProvider();

function Signup(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login");
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMsg = err.message;
                console.log(errorCode, errorMsg);
            })
    }

    return (
        <div className="Signup">
            <div className="body">
                <div className="deco_title"></div>

                <h1 className="title">회원 가입</h1>

                <div className="signup_form">
                    <input className="id_input" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='email'></input>
                    <input className="pw_input" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password'></input>
                    <br/><br/>

                    <button className="submit" onClick={(e)=>{onSubmit(e)}}>가입하기</button>  
                                     
                </div>
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Signup;