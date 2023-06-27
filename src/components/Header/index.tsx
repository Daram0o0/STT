import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useCookies } from 'react-cookie';
import { useState } from 'react';


function Header() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const [accountPopup, setAccountPopup] = useState(false);

  return (
    <div className="Header">
      <div className="home" onClick={() => { navigate("/"); }}>Home</div>
      <div className="setting" onClick={() => { navigate("/setting") }}>설정</div>
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
        }}>{cookies.uidToken ? <p>계정</p> : <p>로그인</p>}</div>
      {accountPopup &&
        <div className="account-popup" onMouseLeave={(e) => {
          e.stopPropagation();
          setAccountPopup(false);
        }}>
          <div className="account-btn">계정</div>
          <div className="account-btn" onClick={() => {
            navigate('/home');
          }}>내 시간표</div>
          <div className="account-btn">계정 정보 수정</div>
          <div className="account-btn" id="logout" style={{ color: "red", marginTop: "auto" }}
            onClick={() => {
              removeCookie("uidToken");
              window.location.reload();
            }}>로그 아웃</div>
        </div>
      }
    </div>
  )
}

export default Header;
