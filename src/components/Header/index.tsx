import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useCookies } from 'react-cookie';

function Header() {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  return (
    <div className="Header">
      <div className="home" onClick={() => { navigate("/") }}>Home</div>
      <div className="setting" onClick={() => { navigate("/setting") }}>Setting</div>
      <div className="account" onClick={() => {
        if (cookies.uidToken) {
          // navigate("/")
        } else {
          navigate("/login");
        }
      }}>{cookies.uidToken ? <p>Account</p> : <p>Login</p>}</div>
    </div>
  )
}

export default Header;
