import React from 'react';
import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../components/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import "./styles.css";

interface google_login{
    width? : string | undefined,
    height? : string | undefined,
    navigate? : string | undefined,
    text? : string | undefined,
}

const provider = new GoogleAuthProvider();

function GoogleLogin(props : google_login){

    const navigate = useNavigate();

    const onSubmitGoogle = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                props.navigate ? navigate(props.navigate) : navigate("/");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
              });
    }

    return(
        <button className="google_login" style={{width:props.width, height:props.height}} onClick={onSubmitGoogle}>
            <img style={{marginLeft:"-10px"}}width="20px" height="20px" src={process.env.PUBLIC_URL + "/Google__G__Logo.svg"} ></img> 
            <p style={{marginLeft:"20px", fontSize:"16px",color:"gray"}}>{props.text ? props.text : "Sign up with Google"}</p>
        </button>
       
    )
}

export default GoogleLogin;