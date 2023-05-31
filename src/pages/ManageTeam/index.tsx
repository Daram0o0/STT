import "./styles.css";
import TimeCell from '../../components/TimeCell';
import { addMember, deleteUser, getMembers, removeMember } from '../../service/tableDB';
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataSnapshot } from "firebase/database";

// 오른쪽 멤버와 위쪽 멤버 이름 맞추기
// 초대링크를 타고 들어와야 멤버 추가가 됨..?
// 이지만 일단 addUser되면 하나씩 늘어나도록 만들어보기
// delete시 useState내 members 지우기
//header 추가
//첫 멤버 -> get

function ManageTeam() {

  const [cookies] = useCookies();
  const { state } = useLocation();
  const roomId = state.roomId;
  const teamName = state.teamName;
  const [members, setMembers] = useState <MemberType>([]);


  // DB에서 불러와서 페이지 열릴 때 멤버 추가

  useEffect(() => {
    getMembers(roomId).then((members) => {
      console.log(members);
    });
  }, [])

  return (
    <div className="ManageTeam">
      <div className="container">
        <div className="main">
          {/* <div>시간표 리스트 + 초대하기 버튼</div> */}
          <div className="timetables">
            {members.map((userId, isOwner) => {
              console.log(userId, isOwner);
              return (
                <Timetable alias={userId} />
              )
            })}

            <div style={{ cursor: "pointer" }} onClick={() => {
              addMember(roomId, "zizon_jiho", false);
              setMembers([...members, { userId: "zizon_jiho", Owner: false, }]);
            }}>
              <div>+</div>
            </div>
          </div>
          <div className="team_timetable">
            <TimeCell />
          </div>
          {roomId}
        </div>
        <div className="members">
          오른쪽 창 - 활성화 멤버 + 대장 왕관 넣기
          {members.map((k, v) => {
            return (
              <Member value={k} bool={Object.values(k)[0]} roomId={roomId} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ManageTeam

function Timetable(props: any) {
  const alias = props.alias;
  return (
    <div>
      <div>{alias}</div>
      {/* <input type="checkbox"/> */}
    </div>
  )
}

function Member(props: any) {
  const userID = props.value;
  const isOwner = props.bool;
  const roomId = props.roomId;
  const idx = props.idx;
  return (
    <div className="member">
      <div className="icons">{userID[0]}</div>
      <p>{userID}</p>
      {isOwner == false && <button onClick={() => { removeMember(roomId, "zizon_jiho",); console.log(idx); }}>강퇴</button>}
    </div>
  )
}
