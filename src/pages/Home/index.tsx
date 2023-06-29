import React from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule } from '../../interfaces';

function Home() {
    const [schedules, setSchedules] = useState<schedule[]>([])

    let [time_table, setTime_table] = useState<time_table>({
        name: "test",
        ownerId: "",
        description: "",
        schedules: schedules
    });

    const [tables, setTables] = useState({});

    return (
        <div className='Home'>
            <div className='top'>
                <div className='top_1'>
                    홈화면
                </div>
                <Modal schedules={schedules} setSchedules={setSchedules} time_table={time_table} setTime_table={setTime_table}/>
            </div>
            <div className='middle'>
                <div className='middle_1'>
                    {/* 여기에 공용 시간표가 보이게 하기 */}
                    <TimeCell time_table={time_table}></TimeCell>
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
    );
}

export default Home;