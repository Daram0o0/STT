import "./styles.css";
import TimeCell from '../../components/TimeCell';
import { addUser, deleteUser } from '../../service/tableDB';
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";

function ManageTeam() {

  const [cookies] = useCookies();
  const { state } = useLocation();
  const roomId = state.roomId;
  const teamName = state.teamName;

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
            <div onClick={()=>{addUser(roomId, "zizon_jiho", false, teamName)}}>
              <div>+</div>
            </div>
          </div>
          <div className="team_timetable">
            <TimeCell/>
          </div>
          {roomId}
        </div>
        <div className="members">
          오른쪽 창 - 활성화 멤버 + 대장 왕관 넣기
          <div className="member">
            <div className="icons">1</div>
            <p>member1</p>
            <button onClick={()=>{deleteUser("zizon_jiho", roomId);}}>강퇴</button>
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