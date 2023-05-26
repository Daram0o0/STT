import "./styles.css";
import "../../components/TimeCell/index";
import { createTable } from "../../service/tableDB/tableDB";
import { useCookies } from "react-cookie";
import { useState } from "react";

function CreateTeam() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [teamName, setTeamName] = useState('');

    return (
        <div className="CreateTeam">
            <div className="container">

                <div className="team_name">
                    <div>팀 이름</div>
                    <input type="text" placeholder="팀 명"
                        value={teamName}
                        onChange={(e) => { setTeamName(e.target.value) }} />
                </div>
                    
                <div className="team_explain">
                    <div>팀 설명</div>
                    <textarea placeholder="simple is best!"></textarea>
                </div>

                
                <div className="invite">
                    <div>초대 링크</div>
                    <p>http://localhost:3000/STT/createteam</p>
                    <button>Invite Code</button>
                </div>

                <div className="make">
                    <button onClick={()=>{createTable(cookies.uidToken, teamName)}}>make</button>
                </div>
                
            </div>
        </div>
    )
}
export default CreateTeam