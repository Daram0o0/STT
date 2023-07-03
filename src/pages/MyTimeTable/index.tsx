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

    function Test() {
        return (
            <>
            <div className="subject">과목명
            <input type={"text"} placeholder="강의명" value = {classtext} onChange = {Saveclass}></input>
        </div>
        <div className="time/place">시간 / 장소
            <input type={"text"} placeholder="장소" value = {wheretext} onChange = {Savewhere}></input>
        </div>
        <div className="select">
            <ol className="ol">
                <li className={ week == 1 ? "active" : ""} onClick={() => {Saveweek(1)}}>월</li>
                <li className={ week == 2 ? "active" : ""} onClick={() => {Saveweek(2)}}>화</li>
                <li className={ week == 3 ? "active" : ""} onClick={() => {Saveweek(3)}}>수</li>
                <li className={ week == 4 ? "active" : ""} onClick={() => {Saveweek(4)}}>목</li>
                <li className={ week == 5 ? "active" : ""} onClick={() => {Saveweek(5)}}>금</li>
                <li className={ week == 6 ? "active" : ""} onClick={() => {Saveweek(6)}}>토</li>
                <li className={ week == 7 ? "active" : ""} onClick={() => {Saveweek(7)}}>일</li>
                <div className="timeselect">
                    <select className="starttime" onChange={Savestart}>
                        {time_list.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <span>~</span>
                    <select className="endtime" onChange={Saveend}>
                        {time_list.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </ol>
        </div>
        </>
        )
    }


    return (
        <div className='MyTimeTable'>
            {toggle && <Modal title="일정 추가하기" closeEvent={() => { setToggle(false); }} element={<div>
                <p>수업명 : {info.className}</p>
                <p>아이디 : {info.id}</p>
                <p>요일 : {info.week}</p>
                <p>시작시간 : {info.startTime}</p>
            </div>} />}
            <Header />
            <div className="mtt-container">
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