import "./styles.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Setting() {
// 글꼴, 글자 크기, 로그아웃, 처음 시작할 페이지,다크모드설정
  return (
    
    <div className="Setting">
      <Header />
      <div className="setting_container">
      <Sidebar/>
      {/* <div className="setting_name">
        <div>Settings</div>
      </div> */}
      
      <div className="setting_subcontainer">
        <div className="logout">
          <div>(￣▽￣)ノ</div>
        </div>
        <div className="setting_page">
          <div className="font">
              <div>font</div>
              <div className="divclass">
                <input type="text" />
                <button>확인</button>
              </div>
          </div>
          <div className="font_size">
            <div>text-size</div>
            <input type="text" />
            <button>확인</button>
          </div>
          <div className="start_addr">
            <div>http://localhost:3000/STT + ?</div>
            <input type="text" />
            <button>확인</button>
          </div>
          <div className="darkmode_btn">
            <div>dark mode</div>
            <button>토글</button>
          </div>
        </div>
        </div>
        </div>
      </div>
      
  )
}
export default Setting