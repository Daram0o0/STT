import "./styles.css";
import TimeCell from '../../components/TimeCell';
import { addMember, deleteUser, getMembers, getTimeTable, getUserName, memberInfo, removeMember } from '../../service/tableDB';
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { schedule, time_table } from "../../interfaces";

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
  const [select, setSelect] = useState(99999999);

  const [fusion, setFusion] = useState<schedule[]>([]);

  const [currentTimeTable, setCurrentTimeTable] = useState<time_table>({
    name: "",
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

  const setSelected = (id: number) => {
    setSelect(id);
  }

  const mixTimeTable = (time_table: time_table) => {
    let temp = [...fusion, ...time_table.schedules];
    setFusion(temp);
  }


  useEffect(() => {
    console.log(fusion);
    getMembers(roomId).then((arr: memberInfo[]) => {
      let temp: memberInfo = { uid: "123ewfw45", isOwner: false, };
      for (let i = 0; i < arr.length; i++){
        if (arr[i].isOwner == true) {
          temp = arr[i];
        }
      }
      const arr2 = arr.filter((v) => {
        return v != temp;
      })
      arr2.unshift(temp);
      setMembers(arr2);
    });

  }, [])

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
                  <Timetable key={i} id={i} uid={v.uid} select={select} setSelected={setSelected} setCurrentTimeTable={setCurrentTimeTable} mixTimeTable={mixTimeTable} />
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
                <div style={{ width: "10px", height: "22  px" }}></div>
              </div>
            </div>
            <br />
            <div className="timecell-wrapper">
              {/* 합친 시간표 */}
              <div>
                <div style={{ marginLeft: "10px", color: "gray" }}>합친 시간표</div>
                <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} readonly={true} time_table={{ name: "fusion", ownerId: "", description: "fusion", schedules: fusion }} />
              </div>

              {/* 선택된 시간표 */}
              <div>
                <div style={{ marginLeft: "10px", color: "gray" }}>현재 시간표</div>
                <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} readonly={true} time_table={currentTimeTable} />
              </div>
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


function Timetable(props: any) {
  const uid = props.uid;
  const [userName, setUserName] = useState<String>("");
  const [timeTable, setTimeTable] = useState<time_table>({
    name: "",
    ownerId: "",
    description: "",
    schedules: [],
  });

  const [fusioned, setFusioned] = useState(false);

  useEffect(() => {
    getTimeTable(uid).then((time_table) => {
      console.log(time_table);
      setTimeTable(time_table);
    });

    getUserName(uid).then((name) => {
      setUserName(name);
    })
  }, [])

  return (
    <div className="top-member">
      <div className="top-member-icon" style={props.select == props.id ? { border: "1px solid var(--main-theme-300)" } : { border: "1px solid var(--main-theme-000)" }} onClick={() => {
        props.setSelected(props.id);
        props.setCurrentTimeTable(timeTable);
      }}><div>{userName}</div></div>
      <div style={{ color: "gray" }}>{userName}</div>
      <div className="fusion" onClick={() => {
        if (!fusioned) {
          props.mixTimeTable(timeTable);
          setFusioned(true);
        }
      }}>합치기</div>

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