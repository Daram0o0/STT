import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { getUserRooms } from '../../service/tableDB';
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
          teamName: props.teamName,
        }
      });
    }}>
      <div className="icon">
        <p style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>{props.teamName[0].toUpperCase()}</p>
      </div>
      <p>{props.teamName}</p>
    </div>
  );
}

interface test {
  roomId: {
    isOwner: boolean,
    roomName: String,
  }
}

function Sidebar(props: ISidebar) {

  const [cookies] = useCookies();

  const [teams, setTeams] = useState<String[]>([]);

  useEffect(() => {
    if (cookies.uidToken) {
      getUserRooms(cookies.uidToken).then((v) => {
        setTeams(v!); // 조심!!!
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
      <div className='container'>
        <div className='profile'>
          <div className='icon'></div>
          <div style={{ marginRight: "10px" }}>{"Zizon jiho"}</div>
          <RiSettings5Fill className="settings" size={24} onClick={() => {
            //navigate settings pages
          }} />

        </div>
        <div className='teams'>
          {
            teams ? Object.entries(teams).map((v, i) => {
              const roomId = v[0];
              const t = v[1];
              console.log(Object.values(t)[1]);
              return <Team roomId={roomId} teamName={Object.values(t)[1]} />
            }) : <p style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "gray" }}>서버 협박하는 중 ...</p>
          }
        </div>
      </div>
    </div>
  );
}


export default Sidebar;
export { };