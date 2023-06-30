import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { getUserName } from '../../service/tableDB';


function Header() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [userName, setUserName] = useState<String>("");

  useEffect(() => {
    getUserName(cookies.uidToken).then((name) => {
      setUserName(name);
    });
  }, [])

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
          <h3 style={{ margin: "0px 0px 10px 0px", userSelect: "none", cursor: "default" }}> {userName} </h3>
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
