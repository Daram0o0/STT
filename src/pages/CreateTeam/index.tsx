import "./styles.css";
import "../../components/TimeCell/index";
import { createRoom } from "../../service/tableDB";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TextareaAutosize from 'react-textarea-autosize';


function CreateTeam() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [roomName, setroomName] = useState('');

    const navigate = useNavigate();
    const teamNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        teamNameRef.current?.focus();
    }, []);

    const createSubmit = () => {
        if (roomName == "") {
            // console.log("team name is blank!");
            alert("팀 이름이 비어있습니다.");
            return;
        }
        if (!cookies.uidToken) {
            // console.log("login need for create Room");
            alert("로그인이 필요합니다.");
            return;
        }
        // console.log("create room!");
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
                            <input className="outer_input" type="text" ref={teamNameRef}
                                placeholder="팀 명"
                                value={roomName}
                                onChange={(e) => { setroomName(e.target.value) }} />
                        </div>
                        <div className="outer">
                            <div>팀 설명</div>
                            <TextareaAutosize className="description" minRows={5} maxRows={20} />
                            {/* <textarea className="outer_input" cols={5}

                                placeholder="simple is best!"></textarea> */}
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