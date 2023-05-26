import "./styles.css";
import "../../components/TimeCell/index";
import TimeCell from "../../components/TimeCell/index";

function CreateTeam() {

    return (
        <div className="CreateTeam">
            <div className="container">
                <div className="team_name">
                    <div>팀 이름</div>
                    <input type="text" placeholder="팀 명"></input>
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
                    <button>make</button>
                </div>
            </div>
        </div>
    )
    
}

export default CreateTeam