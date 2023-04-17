import { useParams } from "react-router-dom";
import { createTable } from './../../service/CreateTable/createTable';

interface Invite{
    url:string,
}

function Invite(){
    const { code } = useParams();
    console.log(code);

    return (
        <div className="Invite">
            invite : {code}
            <button onClick={()=>{createTable(code, "test")}}>테이블 만들기</button>
        </div>
    );
}

export default Invite;