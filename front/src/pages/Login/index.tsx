import "./styles.css";

function Login(){
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
                    <a href="" style={{textDecoration:"none",color:"gray"}}> | 회원가입</a>
                </p>
                <div className="deco_end"></div>
            </div>
        </div>
    )
}

export default Login;