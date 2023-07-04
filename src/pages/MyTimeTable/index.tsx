import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom, getTimeTable } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule, info } from '../../interfaces';
import Header from '../../components/Header';
import OpenModal from '../../components/Modal/TimeTableChange';
import Sidebar from '../../components/Sidebar';
import { useCookies } from 'react-cookie';

function MyTimeTable() {
    const [schedules, setSchedules] = useState<schedule[]>([])
    const [toggle, setToggle] = useState<boolean>(false);
    const [cookie] = useCookies();

    const [timeTable, setTimeTable] = useState<time_table>({
        name: "test",
        ownerId: "",
        description: "",
        schedules: schedules
    });

    const [info, setInfo] = useState<info>({});

    useEffect(() => {
        getTimeTable(cookie.uidToken).then((time_table) => {
            setTimeTable(time_table);
        })
    }, [schedules])



    return (
        <div className='MyTimeTable' >
            {toggle && <Modal title="일정 추가하기" closeEvent={() => { setToggle(false); }} element={<div>
                <p>수업명 : {info.className}</p>
                <p>아이디 : {info.id}</p>
                <p>요일 : {info.week}</p>
                <p>시작시간 : {info.startTime}</p>
            </div>} />}
            <Header />

            <div className="mtt-container" >
                <Sidebar />
                <div className="mtt-body">
                    <h1>내 시간표</h1>
                    <TimeCell style={{ width: "600px", height: "700px" }} readonly={false} time_table={timeTable} clickEvent={(info: any) => {
                        setToggle(true);
                        setInfo(info);
                    }} />
                </div>
            </div>

        </div>
    );
}

export default MyTimeTable;