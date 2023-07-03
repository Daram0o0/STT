import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule } from '../../interfaces';
import Header from '../../components/Header';
import OpenModal from '../../components/Modal/TimeTableChange';
import Sidebar from '../../components/Sidebar';

function MyTimeTable() {
    const [schedules, setSchedules] = useState<schedule[]>([])
    const [toggle, setToggle] = useState<boolean>(false);

    const [time_table, setTime_table] = useState<time_table>({
        name: "test",
        ownerId: "",
        description: "",
        schedules: schedules
    });

    useEffect(() => {
        setTime_table({
            name: "test",
            ownerId: "",
            description: "",
            schedules: schedules
        })
    }, [schedules])

    function OpenModal() {
        setToggle(!toggle)
    }

    const [tables, setTables] = useState({});

    return (
        <div className='MyTimeTable'>
            {
                toggle && (
                    <Modal element={<div>오픈모달이지롱</div>}></Modal>
                )
            }
            {/* <Modal element={<div>Hello</div>} /> */}
            <Header />
            <div className="mtt-container">
                <Sidebar />
                <div className="mtt-body">
                    <button type='button' onClick={OpenModal}>시간표 추가</button>
                    <TimeCell time_table={time_table} clickEvent={(info: any) => {
                        setToggle(true);
                        console.log(info);
                    }} />
                </div>
            </div>

        </div>
    );
}

export default MyTimeTable;