import "./styles.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { createContext, useContext, useState } from 'react';
const themeDefault = {backgroundcolor: 'black', color: 'white'};
const themeContext = createContext(themeDefault);

function Setting() {
// 글꼴, 글자 크기, 로그아웃, 처음 시작할 페이지, 다크모드설정
  const [isChecked, setIsChecked] = useState(false);
  const theme = useContext(themeContext);
  console.log(theme)
  return (
    // <themeContext.Provider value={theme}>
    <div className="Setting" style={theme}>
      <Header />
      <div className="setting_container">
      <Sidebar/>
      
      <div className="setting_subcontainer">
        <div className="setting_page">
          <div className="font">
              <div className="divname">font</div>
              <div className="divclass">
                <input type="text" />
                <button>확인</button>
              </div>
            </div>
            <div className="font_size">
              <div className="divname">text-size</div>
              <div className="divclass">
                <input type="text" />
                <button>확인</button>
              </div>
            </div>
            <div className="start_addr">
              <div className="divname">http://localhost:3000/STT + ?</div>
              <div className="divclass">
                <input type="text" />
                <button>확인</button>
              </div>
            </div>
          <div className="darkmode_btn">
            <div className="divname">dark mode</div>
            <div className="divclass">
              <input type="checkbox" id="toggle" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)} } hidden/>
                
              <label htmlFor="toggle" className="toggleSwitch">
                <span className="toggleButton"></span>
              </label>
          </div>
          </div>
            
          </div>
        </div>
        </div>
      </div>
      // </themeContext.Provider>
  )
}
export default Setting