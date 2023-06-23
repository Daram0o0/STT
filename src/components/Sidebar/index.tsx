import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { getUserRooms, roomInfo, getUserName } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { RiSettings5Fill } from 'react-icons/ri';
import { RxDotsVertical } from 'react-icons/rx';

interface ISidebar {
  width?: string,
  sticky?: string,
  resizable?: boolean,
}

const Team = (props: any) => {

  const [hover, setHover] = useState(false);
  const [roomOption, setRoomOption] = useState(false);

  const [mouseY, setMouseY] = useState(0);

  const navigate = useNavigate();
  return (
    <div className="team"
      onMouseEnter={() => { setHover(true); }}
      onMouseLeave={() => { setHover(false); }}
      onClick={() => {
        navigate('/manageteam', {
          state: {
            roomId: props.roomId,
            roomName: props.roomName,
          }
        });
      }}>
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
        <div className="room-option-popup" style={{ top: mouseY - 15 }} onClick={(e) => {
          e.stopPropagation();
        }}>
          <div className="popup-btn">방 설정</div>
          <div className="popup-btn" id="deleteRoom" style={{ color: 'red', marginTop: "auto" }}>방 삭제</div>
        </div>
      }
    </div>
  );
}



function Sidebar(props: ISidebar) {

  const [cookies] = useCookies();

  const [teams, setTeams] = useState<roomInfo[]>([]);
  const [nickname, setNickName] = useState<String>("");


  const navigate = useNavigate();

  useEffect(() => {
    //uid 토큰이 유효할 경우 == 로그인 되어 있다면
    if (cookies.uidToken) {
      getUserName(cookies.uidToken).then((name) => {
        setNickName(name);
      })
      getUserRooms(cookies.uidToken).then((rooms) => {
        setTeams(rooms);
      });

    } else {
      console.log("login need");
      // alert("로그인이 필요합니다.");
    }

  }, [])

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
            teams ? teams.map((info, i) => {
              // console.log("info:", info);
              return <Team key={i} roomId={info.roomId} roomName={info.roomName} />
            }) : <p style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}>서버 협박하는 중 ...</p>
          }
          <div className="create-team" onClick={() => {
            navigate('/createTeam');
          }}>+ 팀 만들기</div>
        </div>
      </div>
    </div>
  );
}


export default Sidebar;
export { };