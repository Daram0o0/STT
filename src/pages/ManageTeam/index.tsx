import "./styles.css";
import { addMember, deleteUser, getMembers, getTimeTable, getUserName, memberInfo, removeMember } from '../../service/tableDB';
import { Cookies, useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { schedule, time_table } from "../../interfaces";
import { RiVipCrownFill } from "react-icons/ri";
import Modal from "../../components/Modal";
import STTError from "../../Error";
import Card from "../../components/Card";
import axios from "axios";
import { get, post } from "./../../service/nasdac_db";

interface msgInfo {
  uid: String,
  msg: String,
  date: number,
  roomId: String,
}


function ManageTeam() {

  const [cookies] = useCookies();
  const { state } = useLocation();
  const roomId = state.roomId;
  const roomName = state.roomName;
  const [members, setMembers] = useState<memberInfo[]>([]);
  const [addMemberPopup, setAddMemberPopup] = useState(false);
  const [select, setSelect] = useState(99999999);

  const [chatValue, setChatValue] = useState("");
  const [lastChat, setLastChat] = useState<String>("");
  const [chats, setChats] = useState<msgInfo[]>([]);
  const [sentMsg, setSentMsg] = useState(true);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [fusion, setFusion] = useState<schedule[]>([]);

  const [rightEnable, setRightEnable] = useState(true);
  const [rightTransitionEnd, setRightTransitionEnd] = useState(false);

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

  const sendMsg = (msg: String) => {
    post("echo", msg).then((res) => {
      console.log("db res : ", res);
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

    getMembers(roomId).then((arr: memberInfo[]) => {
      let temp: memberInfo = { uid: "123ewfw45", isOwner: false, };
      for (let i = 0; i < arr.length; i++) {
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

  }, [state])

  useEffect(() => {
    //스크롤 맨 아래로 내림.
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current?.scrollHeight;
      console.log(chatBodyRef.current.scrollTop, chatBodyRef.current.scrollHeight);
    }

    setLastChat("");
  }, [chats.length])

  return (
    <div className="ManageTeam">
      {
        addMemberPopup &&
        <Modal title="멤버 추가" closeEvent={() => { setAddMemberPopup(false); }} element={
          <div className="addmember-popup">
            <br />
            <div>초대 링크를 전송하여 초대하기</div>
            <br />
            <div className="invite">
              <div className="invite-box">{"http://localhost:3000/invite/" + roomId}</div>
              <div className="invite-check">✔</div>
            </div>
          </div>}
        />
      }
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
        <div className="main">
          <div className="left-body" style={rightEnable ? { width: "calc(50% - 42px)" } : { width: "calc(100% - 42px)" }}>
            <div className="widgets" style={{ display: "flex", minHeight: "100%", height: "auto", flexDirection: "column" }}>
              <Card notitle style={{ marginBottom: "20px", height: "500px" }} element={
                <div className="timetable" style={{ display: "flex", justifyContent: "center" }}>
                  공지사항
                </div>
              } />
              <Card notitle style={{ marginBottom: "20px", height: "700px" }} element={
                <div className="timetable" style={{ display: "flex", justifyContent: "center" }}>
                  캘린더
                </div>
              } />
              <Card notitle style={{ marginBottom: "20px", height: "700px" }} element={
                <div className="timetable" style={{ display: "flex", justifyContent: "center" }}>
                  시간표
                </div>
              } />
            </div>
          </div>
          {
            rightEnable &&
            <div className="right-body" onClick={() => { /*setRightEnable(false)*/ }}>
              <Card style={{ width: "100%", height: "calc(100% - 50px)" }} notitle element={
                <div className="chat">
                  <div className="chat-body" ref={chatBodyRef}>
                    {chats.map((v, i) => {
                      return <Chat key={i} idx={i} msg={v.msg} me={v.uid == cookies.uidToken} />
                    })}
                  </div>
                  <div className="chat-interactive">
                    <input className="chat-input" value={chatValue} onChange={(e) => { setChatValue(e.target.value); }} onKeyUp={(e) => {
                      if (e.key === 'Enter' && chatValue.length > 0) {
                        sendMsg(chatValue);

                        let temp = chats;
                        temp.push({
                          uid: cookies.uidToken,
                          msg: chatValue,
                          date: Date.now(),
                          roomId: roomId,
                        })
                        setLastChat(chatValue);
                        setChats(temp);
                        setChatValue("");
                      }
                    }}></input>
                    <div className="sendmsg">보내기</div>
                  </div>
                </div>
              } />
            </div>
          }
          {/* <div>시간표 리스트 + 초대하기 버튼</div> */}
          {
            /* <div className="sub">
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
                  
                  <div className="top-member-icon"><div>+</div></div>
                  <div style={{ color: "gray" }}> 추가 </div>
                  <div style={{ width: "10px", height: "22px" }}></div>
                </div>
              </div>
              <br />
              <div className="timecell-wrapper">
                
                <div>
                  <div style={{ marginLeft: "10px", color: "gray" }}>합친 시간표</div>
                  <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} readonly={true} time_table={{ name: "fusion", ownerId: "", description: "fusion", schedules: fusion }} />
                </div>
  
                
                <div>
                  <div style={{ marginLeft: "10px", color: "gray" }}>현재 시간표</div>
                  <TimeCell style={{ width: "500px", height: "700px", margin: "10px" }} readonly={true} time_table={currentTimeTable} />
                </div>
              </div>
            </div> */
          }

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

function Chat(props: any) {
  const me = props.me;
  const style = {
    width: "calc(100%-2px)",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--main-border-light)",
    marginTop: `${props.idx == 0 && "auto"}`
  };
  const otherStyle = { paddingLeft: "10px", };
  const meStyle = { marginLeft: "auto", paddingRight: "10px" }
  return (
    <div className="Chat" style={style}>
      <div style={me ? meStyle : otherStyle}>{props.msg}</div>

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
    }).catch((err: STTError) => {
      console.log(err.code, err.message);
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
  const [cookies] = useCookies();
  const [userName, setUserName] = useState<String>("");

  useEffect(() => {
    getUserName(userID).then((name) => {
      setUserName(name);
    });
  }, [])

  console.log(getUserName(cookies.uidToken));
  console.log(userID);
  return (
    <div className="member">
      <div className="icons">{userName[0]}</div>
      <p style={{ marginRight: "5px" }}>{userName}</p>
      {isOwner == false ? <button onClick={() => { props.deleteMember(roomId, userID); }}>강퇴</button> :
        <RiVipCrownFill className="crown" size={20} color="gold" onClick={() => {
        }} />}
    </div>
  )
}

export default ManageTeam;