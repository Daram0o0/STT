import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useCookies } from 'react-cookie';
import { useState } from 'react';


function Header() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const [accountPopup, setAccountPopup] = useState(false);

  return (
    <div className="Header">
      <div className="home" onClick={() => { navigate("/") }}>Home</div>
      <div className="setting" onClick={() => { navigate("/setting") }}>Setting</div>
      <div className="account" onClick={() => {
        if (cookies.uidToken) {
          // navigate("/")
          setAccountPopup(!accountPopup);
        } else {
          navigate("/login");
        }
      }}
        onBlur={() => {
          setAccountPopup(false);
        }}>{cookies.uidToken ? <p>Account</p> : <p>Login</p>}</div>
      {accountPopup &&
        <div className="account-popup">
          <div className="account-btn">계정</div>
          <div className="account-btn">계정 정보 수정</div>
          <div className="account-btn">계정 정보 수정</div>
          <div className="account-btn" id="logout" style={{ color: "red", marginTop: "auto" }}>로그 아웃</div>
        </div>
      }
    </div>
  )
}

export default Header;
