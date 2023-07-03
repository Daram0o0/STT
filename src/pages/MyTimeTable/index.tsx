import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom, getTimeTable } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule } from '../../interfaces';
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

    useEffect(() => {
        getTimeTable(cookie.uidToken).then((time_table) => {
            setTimeTable(time_table);
        })
    }, [schedules])

    function OpenModal() {
        setToggle(!toggle)
    }



    return (
        <div className='MyTimeTable'>
            {toggle && <Modal title="일정 추가하기" closeEvent={() => { setToggle(false); }} element={<div>1</div>} />}
            <Header />
            <div className="mtt-container">
                <Sidebar />
                <div className="mtt-body">
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