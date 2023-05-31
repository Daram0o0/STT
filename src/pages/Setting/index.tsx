import "./styles.css";

function Setting() {
// 글꼴, 글자 크기, 로그아웃, 처음 시작할 페이지,다크모드설정
  return (
    <div className="setting_container">
      <div className="setting_name">
        <div>Settings</div>
      </div>
      
      <div className="setting_subcontainer">
        <div className="logout">
          <div>(￣▽￣)ノ</div>
        </div>
        <div className="setting_page">
          <div className="font">
            <div>font</div>
            <input type="text" />
            <button></button>
          </div>
          <div className="font_size">
            <div>글자 크기</div>
            <input type="text" />
            <button>확인</button>
          </div>
          <div className="start_addr">
            <div>시작 주소</div>
            <input type="text" />
            <button>확인</button>
          </div>
          <div className="darkmode_btn">
            <div>다크모드설정</div>
            <button>토글</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Setting