import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { getUserRooms, roomInfo, getUserName, deleteRoom, getMembers, getRoomName } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { RiSettings5Fill } from 'react-icons/ri';
import { RxDotsVertical } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../service/redux/counterSlice';
interface ISidebar {
  width?: string,
  sticky?: string,
  resizable?: boolean,
}

const Team = (props: any) => {

  const [hover, setHover] = useState(false);
  const [roomOption, setRoomOption] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const [cookies] = useCookies();
  const [isOwner, setIsOwner] = useState(false);

  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSelected(props.id == props.select);
    //권한 여부
    getMembers(props.roomId).then((members) => {
      let uid = cookies.uidToken;

      for (let i = 0; i < members.length; i++) {
        // console.log(members[i].uid);
        if (members[i].uid == uid) {
          // console.log("uid : ", uid);
          if (members[i].isOwner) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        }
      }
    })
  }, [props.select])

  return (
    <div className="team"
      onMouseEnter={() => { setHover(true); }}
      onMouseLeave={() => { setHover(false); }}
      onClick={() => {
        props.setSelect(props.id);
        navigate('/manageteam', {
          state: {
            roomId: props.roomId,
            roomName: props.roomName,
          }
        });
      }}
      style={selected ? { backgroundColor: "rgb(230, 230, 230)" } : {}}
    >
      <div className="icon">
        <p style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>{props.roomName[0].toUpperCase()}</p>
      </div>
      <p>{props.roomName}</p>
      {
        hover &&
        <div className="room-option" style={{ marginLeft: 'auto', marginRight: '20px' }}
          // onMouseLeave={(e) => {
          //   setTimeout(() => {
          //     setRoomOption(false);
          //   }, 500)
          // }}
          onClick={(e) => {
            e.stopPropagation();
            setMouseY(e.clientY);
            setRoomOption(!roomOption);
          }}><RxDotsVertical size={16} /></div>
      }
      {
        roomOption &&
        <div className="room-option-popup" style={{ top: mouseY - 15 }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setRoomOption(false);
            setHover(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className="popup-btn">방 설정</div>
          {
            isOwner ?
              <div className="popup-btn" id="deleteRoom" style={{ color: 'red', marginTop: "auto" }}
                onClick={() => {
                  props.removeRoom(props.roomId, props.roomName);
                }}> 방 삭제 </div> :
              <div className="popup-btn" id="exitRoom" style={{ color: 'red', marginTop: "auto" }}>방 나가기</div>
          }
        </div>
      }
    </div >
  );
}

function Sidebar(props: ISidebar) {

  const [cookies] = useCookies();

  const [teams, setTeams] = useState<roomInfo[]>([]);
  const [nickname, setNickName] = useState<String>("");
  const [roomsGetDone, setRoomsGetDone] = useState(false);
  const [select, setSelect] = useState(99999999);

  // const rooms = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeRoom = (roomId: String, roomName: String) => {
    let msg = "정말로 " + roomName + "을 삭제 하시겠습니까?";
    if (!window.confirm(msg)) {
      return;
    }

    let permission = false;

    getMembers(roomId).then((members) => {
      let uid = cookies.uidToken;
      // console.log("members : ", members);
      for (let i = 0; i < members.length; i++) {
        // console.log(members[i].uid);
        if (members[i].uid == uid) {
          // console.log("uid : ", uid);
          if (members[i].isOwner) {
            deleteRoom(roomId);
            let t = teams.filter((v) => {
              return v.roomId != roomId;
            })
            setTeams(t);
          } else {
            alert("권한이 없습니다!");
          }
        }
      }
    })
  }

  useEffect(() => {
    dispatch(getRooms);
    //uid 토큰이 유효할 경우 == 로그인 되어 있다면
    if (cookies.uidToken) {
      getUserName(cookies.uidToken).then((name) => {
        setNickName(name);
      })
      getUserRooms(cookies.uidToken).then((rooms) => {
        setRoomsGetDone(true);
        if (rooms.length > 0) {
          setTeams(rooms);
        }

      });

    } else {
      console.log("login need");
      // alert("로그인이 필요합니다.");
    }

  }, [select])

  const styles = {
    width: props.width ? props.width : '250px',
    height: "100%",
  }

  return (
    <div className="Sidebar" style={styles}>
      <div className='sidebar-container'>
        <div className='profile'>
          <div className='icon'></div>
          <div style={{ marginRight: "10px" }}>{nickname}</div>

          <RiSettings5Fill className="settings" size={24} onClick={() => {
            //navigate settings pages
          }} />
          <p>팀 설정</p>

        </div>
        <div className='teams'>
          <p style={{ marginLeft: "20px", color: "gray" }}>내 팀</p>
          {
            teams.length > 0 ? teams.map((info, i) => {
              // console.log("info:", info);
              return <Team key={i} id={i} roomId={info.roomId} roomName={info.roomName} removeRoom={removeRoom} setSelect={setSelect} select={select} />
            }) : !roomsGetDone ? <p style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}>  서버 협박하는 중 ...</p> :
              <p style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}> 팀이 없습니다.</p>
          }
          {
            cookies.uidToken ? <div className="create-team" onClick={() => {
              navigate('/createTeam');
            }}>+ 팀 만들기</div>
              : <p style={{ color: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>로그인이 필요합니다</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
export { };