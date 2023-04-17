import { useParams } from "react-router-dom";

interface Invite{
    url:string,
}

function Invite(){
    const { code } = useParams();
    console.log(code);

    return (
        <div className="Invite">
            invite : {code}

        </div>
    );
}

export default Invite;