import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { addMember, getRoomName } from "../../service/tableDB";

interface Invite {
    url: string,
}

function Invite() {
    const { code } = useParams();

    const [cookies] = useCookies();

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.uidToken) {
            if (code) {
                getRoomName(code).then((roomName) => {
                    addMember(code, cookies.uidToken, false);
                    navigate("/manageTeam", {
                        state: {
                            roomId: code,
                            roomName: roomName,
                        }
                    })
                })

            }
        } else {
            console.log('login need');
        }
    }, [])

    return (
        <div className="Invite">
            invite : {code}

        </div>
    );
}

export default Invite;