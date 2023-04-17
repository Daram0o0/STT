import React from 'react';
import {useState} from 'react';
import './styles.css';
import { createTable , getMyTableList} from '../../service/tableDB/tableDB';

function Home() {

    const [tables, setTables] = useState({});

    return(
        <div className='Home'>
            <div className='top'>
                <div className='top_1'>
                    홈화면
                </div>
            </div>
            <div className='middle'> 
                <div className='middle_1'>
                    여기에 공용 시간표가 보이게 하기
                    <button onClick={()=>{createTable(localStorage.getItem('uid'), "TestRoom");}}>테이블 만들기</button> {/**임시 추가 */}
                    <button onClick={()=>{
                        getMyTableList(localStorage.getItem('uid'))
                            .then((r)=>{
                                setTables(r);
                                console.log(r);
                            })
                        }
                    }>방 얻기</button>
                    
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom-box'>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>내 시간표</a>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>| 홈</a>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>| 설정</a>
                </div>
            </div>
        </div>
    );
}

export default Home;