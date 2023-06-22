import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { getUserRooms, roomInfo } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { RiSettings5Fill } from 'react-icons/ri';

interface ISidebar {
  width?: string,
  sticky?: string,
  resizable?: boolean,
}

const Team = (props: any) => {

  const navigate = useNavigate();
  return (
    <div className="team" onClick={() => {
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
    </div>
  );
}



function Sidebar(props: ISidebar) {

  const [cookies] = useCookies();

  const [teams, setTeams] = useState<roomInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.uidToken) {
      console.log('uid');
      getUserRooms(cookies.uidToken).then((rooms) => {
        console.log("res : ", rooms);
        setTeams(rooms);
      });

    } else {
      console.log("login need");
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
          <div style={{ marginRight: "10px" }}>{"Zizon jiho"}</div>
          <RiSettings5Fill className="settings" size={24} onClick={() => {
            //navigate settings pages
          }} />

        </div>
        <div className='teams'>
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