import "./styles.css";
import TimeCell from '../../components/TimeCell';

function ManageTeam() {
  return (
    <div className="ManageTeam">
      <div className="container">
        <div className="main">
          {/* <div>시간표 리스트 + 초대하기 버튼</div> */}
          <div className="timetables">
            <div>
              <div>CJH</div>
              {/* <input type="checkbox"/> */}
            </div>
            <div>
              <div>2</div>
              {/* <input type="checkbox"/> */}
            </div>
            <div>
              <div>3</div>
              {/* <input type="checkbox"/> */}
            </div>
            <div>
              <div>+</div>
            </div>
          </div>
          <div className="team_timetable">
            <TimeCell/>
          </div>
        </div>
        <div className="members">
          오른쪽 창 - 활성화 멤버 + 대장 왕관 넣기
          <div className="member">
            <div className="icons">1</div>
            <p>member1</p>
          </div>
          <div className="member">
            <div className="icons">2</div>
            <p>member2</p>
          </div>
          <div className="member">
            <div className="icons">3</div>
            <p>member3</p>
          </div>
          <div className="member">
            <div className="icons">4</div>
            <p>member4</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManageTeam