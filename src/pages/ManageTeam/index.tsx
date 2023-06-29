import "./styles.css";
import TimeCell from '../../components/TimeCell';
import { addMember, deleteUser, getMembers, getUserName, memberInfo, removeMember } from '../../service/tableDB';
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { time_table } from "../../interfaces";

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
  const roomName = state.roomName;
  const [members, setMembers] = useState<memberInfo[]>([]);
  const [addMemberPopup, setAddMemberPopup] = useState(false);

  const [currentTimeTable, setCurrentTimeTable] = useState<time_table>({
    name: "empty",
    ownerId: "",
    description: "",
    schedules: [],
  });

  const addMemPopupRef = useRef<HTMLDivElement>(null);
  // DB에서 불러와서 페이지 열릴 때 멤버 추가

  const deleteMember = (_roomId: String, _userId: String) => {
    console.log(_userId);

    getUserName(_userId).then((name) => {
      if (window.confirm("정말로 " + name + " 님을 퇴장 시키겠습니까?")) {
        console.log(members);
        removeMember(_roomId, _userId);
        let t = members;
        let temp = t.filter((v, i) => {
          return v.uid != _userId;
        })
        console.log(temp);
        setMembers(temp);
      }
    })
  }

  useEffect(() => {
    getMembers(roomId).then((arr: memberInfo[]) => {
      setMembers(arr);
    });

  }, [roomId, members])

  return (
    <div className="ManageTeam">
      <Header />
      <div className="container"
        tabIndex={0}
        onKeyUp={(e) => {
          // e.isPropagationStopped();
          if (e.key === "Escape") {
            setAddMemberPopup(false);
          }
        }}>
        <Sidebar />
        {
          addMemberPopup &&
          <div className="addmember-popup"
            ref={addMemPopupRef}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setAddMemberPopup(false);
              }
            }}>
            <div className="close-btn" onClick={() => { setAddMemberPopup(false); }}></div>
            <h1 style={{ color: "rgb(60, 60, 60)" }}>멤버 추가</h1>
            <br />
            <div>초대 링크를 전송하여 초대하기</div>
            <br />
            <div className="invite">
              <div className="invite-box">{"http://localhost:3000/invite/" + roomId}</div>
              <div className="invite-check">✔</div>
            </div>
          </div>
        }
        <div className="main">
          {/* <div>시간표 리스트 + 초대하기 버튼</div> */}
          <div className="sub">
            <div className="team_title">{roomName}</div>
            <br />

            <div className="timetables">
              {members.map((v, i) => {

                return (
                  <Timetable key={i} uid={v.uid} />
                )
              })}
              <div className="top-member" style={{ cursor: "pointer" }} onClick={() => {
                setAddMemberPopup(true);
                addMemPopupRef.current?.focus();
                // addMember(roomId, "zizon_jiho", false);
              }}>
                {/* 아래로 기운 것 같음ㅠㅠ */}
                <div className="top-member-icon"><div>+</div></div>
                <div style={{ color: "gray" }}> 추가 </div>
              </div>
            </div>
            <br />
            <div className="timecell-wrapper">
              <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} />
              <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} time_table={currentTimeTable} />
            </div>
          </div>
          {roomId}
        </div>
        <div className="members">
          {/* 오른쪽 창 - 활성화 멤버 + 대장 왕관 넣기 */}
          <p style={{ marginLeft: "20px", color: "gray" }}>멤버</p>

          {members.map((v, i) => {
            return <Member key={i} idx={i} uid={v.uid} isOwner={v.isOwner} roomId={roomId} deleteMember={deleteMember}></Member>
          })}
        </div>
      </div>
    </div>
  )
}


{/* {members.map((k, v) => {
            return (
              <Member value={k} bool={Object.values(k)[0]} roomId={roomId} />
            ) */}

function Timetable(props: any) {
  const uid = props.uid;
  const [userName, setUserName] = useState<String>("");
  const [select, setSelect] = useState(false);

  useEffect(() => {

    getUserName(uid).then((name) => {
      setUserName(name);
    })
  }, [])

  return (
    <div className="top-member">
      <div className="top-member-icon" style={select ? { border: "1px solid var(--main-theme-300)" } : { border: "1px solid var(--main-theme-000)" }} onClick={() => {
        setSelect(!select);
      }}><div>{userName}</div></div>
      <div style={{ color: "gray" }}>{userName}</div>
      {/* <input type="checkbox"/> */}
    </div >
  )
}

function Member(props: any) {
  const userID = props.uid;
  const isOwner = props.isOwner;
  const roomId = props.roomId;
  const idx = props.idx;

  const [userName, setUserName] = useState<String>("");



  useEffect(() => {
    getUserName(userID).then((name) => {
      setUserName(name);
    });
  }, [])

  return (
    <div className="member">
      <div className="icons">{userName[0]}</div>
      <p style={{ marginRight: "5px" }}>{userName}</p>
      {isOwner == false && <button onClick={() => { props.deleteMember(roomId, userID); }}>강퇴</button>}
    </div>
  )
}

export default ManageTeam;