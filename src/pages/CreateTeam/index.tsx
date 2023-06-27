import "./styles.css";
import "../../components/TimeCell/index";
import { createRoom } from "../../service/tableDB";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


function CreateTeam() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [roomName, setroomName] = useState('');

    const navigate = useNavigate();

    const createSubmit = () => {
        if (roomName == "") {
            console.log("team name is blank!");
            return;
        }
        if (!cookies.uidToken) {
            console.log("login need for create Room");
            return;
        }
        console.log("create room!");
        createRoom(cookies.uidToken, roomName).then((roomId: String | null) => {
            navigate('/manageteam', {
                state: {
                    roomId: roomId,
                    roomName: roomName,
                }
            });
        });
    }

    return (
        <div className="CreateTeam">
            <Header />
            <div className="wrapper">
                <Sidebar />
                <div className="container">
                    <div className="createbox">
                        <div className="outer">
                            <div>팀 이름</div>
                            <input className="outer_input" type="text"
                                placeholder="팀 명"
                                value={roomName}
                                onChange={(e) => { setroomName(e.target.value) }} />
                        </div>
                        <div className="outer">
                            <div>팀 설명</div>
                            <textarea className="outer_input" placeholder="simple is best!"></textarea>
                        </div>

                        <div className="outer">
                            <button onClick={createSubmit}>make</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CreateTeam