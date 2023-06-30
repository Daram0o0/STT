import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule } from '../../interfaces';
import Header from '../../components/Header';

function Home() {
    const [schedules, setSchedules] = useState<schedule[]>([])

    const [time_table, setTime_table] = useState<time_table>({
        name: "test",
        ownerId: "",
        description: "",
        schedules: schedules
    });

    useEffect(() => {

    })

    const [tables, setTables] = useState({});

    return (
        <>
        <Header></Header>
        <div className='Home'>
            <div className='top'>
                <Modal schedules={schedules} setSchedules={setSchedules} time_table={time_table} setTime_table={setTime_table}/>
                <button type='button' onClick={() => {console.log(time_table)}}>출력창</button>
            </div>
            <div className='middle'>
                <div className='middle_1'>
                    {/* 여기에 공용 시간표가 보이게 하기 */}
                    <TimeCell time_table={time_table}  clickEvent={(info: any) => {
                        console.log("id",info.id);
                        console.log("where",info.where);
                        console.log("className",info.className);
                    }}></TimeCell>
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom-box'>
                    <a href="" style={{ textDecoration: "none", color: "gray" }}>내 시간표</a>
                    <a href="" style={{ textDecoration: "none", color: "gray" }}>| 홈</a>
                    <a href="" style={{ textDecoration: "none", color: "gray" }}>| 설정</a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;