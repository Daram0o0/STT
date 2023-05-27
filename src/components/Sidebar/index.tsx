import { useEffect, useRef, useState } from 'react';
import './styles.css';
import styled, { css } from "styled-components";
import { getMyTables } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface ISidebar{
  width?: string,
  sticky? : string,
  resizable? : boolean,
}

const Team = (props: any) => {

  const navigate = useNavigate();
  return(
    <div className="team" onClick={()=>{
      navigate('/manageteam', {
        state : {
            roomId : props.roomId,
            teamName : props.teamName,
        }
    });
    }}>
      {props.teamName}
    </div>
  );
}

interface test {
  roomId : {
    isOwner : boolean,
    roomName : String,
  }
}

function Sidebar(props : ISidebar){

  const [cookies] = useCookies();

  const [teams, setTeams] = useState<test | undefined>(undefined);

  useEffect(()=>{
    if (cookies.uidToken){
      getMyTables(cookies.uidToken).then((v : test)=>{
        setTeams(v);
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
    <div className="Sidebar" style={styles} >
      <div className='container'>
        <div className='profile'></div>
        <hr></hr>
        <div className='teams'>
          {
            teams && Object.entries(teams).map((v, i)=>{
              const roomId = v[0];
              const t = v[1];
              console.log(Object.values(t)[1]);
              return <Team roomId={roomId} teamName={Object.values(t)[1]}/>
            })
          }
        </div>
      </div>
    </div>
  );
}


export default Sidebar;
export {};