import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom, getTimeTable, addTimeTable } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule, info } from '../../interfaces';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useCookies } from 'react-cookie';
import { ref, update } from 'firebase/database'
import { db } from '../../components/firebase';




function MyTimeTable() {
    const [schedules, setSchedules] = useState<schedule[]>([])
    const [toggle, setToggle] = useState<boolean>(false);
    const [cookie] = useCookies();

    const [id, setId] = useState<number>(0); // 수업 구분할 id값
    const [classtext, setClasstext] = useState<string>(""); // 강의명
    const [wheretext, setWheretext] = useState<string>(""); // 강의실 위치
    const [week, setWeek] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(9);
    const [endTime, setEndtime] = useState<number>(10); // 끝나는 시간

    const [timeTable, setTimeTable] = useState<time_table>({
        name: "test",
        ownerId: cookie.uidToken,
        description: "",
        schedules: schedules
    });

    const [info, setInfo] = useState<info>({});

    let [getstartTime, setGetstartTime] = useState<number>(0);
    let [tempstarTime, setTempstartTime] = useState<number>(0);

    useEffect(() => {
        if (cookie.uidToken != undefined) {
            addTimeTable(cookie.uidToken, timeTable);
      
            getTimeTable(cookie.uidToken).then((timeTable) => {
            //   console.log("timeTable : ", timeTable);
            })
        }
        setTimeTable({
            name: "test12",
            ownerId: cookie.uidToken,
            description: "test12의 시간표",
            schedules: schedules
          });
    }, [schedules])

    // 수업 이름 저장 함수
    function Saveclass(e:any) {
        setClasstext(e.target.value);
    }

    // 교실 위치 저장 함수
    function Savewhere(e:any) {
        setWheretext(e.target.value);
    }

    // 종료 시간 저장 함수
    function Saveend(e:any) {
        setGetstartTime(Number(e.target.value))
        setEndtime(Number(e.target.value))
        console.log("getstartTime", getstartTime)
        console.log("tempstarTime", tempstarTime)
        console.log("startTime", startTime)
        console.log("endTime", endTime)
    }

    let className : string
    let where : string

    return (
        <div className='MyTimeTable'>
            {
                toggle && // toggle가 true일 때
                (
                    info.className ? // info.className가 true일 때 일정 수정 / 삭제
                    
                    <Modal title={"일정 수정 / 삭제"} closeEvent={() => { 
                        setToggle(false)
                        setClasstext("")
                        setWheretext("")
                     }} element={
                        <div>
                            <p>수업명 : {info.className} <input type={"text"} value={classtext} onChange={Saveclass} autoFocus/></p>
                            <p>장소 : {info.where} <input type={"text"} value={classtext} onChange={Savewhere}/></p>
                            <p>아이디 : {info.id}</p>
                            <p>요일 : {info.week}</p>
                            <p>시작시간 : {info.startTime}</p>

                            {/* 수정 부분 */}
                            <button type='button' onClick={() => {
                                if (classtext != "" && wheretext != "") {
                                    if (getstartTime >= tempstarTime) {
                                        let set = [...schedules, {
                                            id: id,
                                            className: classtext,
                                            where: wheretext,
                                            week: week,
                                            startTime: startTime,
                                            endTime: endTime
                                        }]
                                        setSchedules(set)
                                        setTimeTable({
                                            name: "test12",
                                            ownerId: cookie.uidToken,
                                            description: "test12의 시간표",
                                            schedules: schedules
                                        })
                                        setClasstext("")
                                        setWheretext("")
                                        setToggle(!toggle)
                                        addTimeTable(cookie.uidToken, timeTable);
                                    }
                                    else {
                                        alert("종료시간이 시작시간보다 작거나 같습니다.")
                                    }
                                }
                                else {
                                    alert("수업명 또는 장소를 입력하지 않았습니다.")
                                }
                            }}>수정</button>

                            {/* 삭제 부분 */}
                            <button type='button' onClick={() => {
                                let temp = schedules;
                                let id = info.id;
                                console.log("temp", temp);
                                console.log("받아온 id", id);
                                console.log("scheduls", schedules);
                                for (let i = 0; i < schedules.length; i++) {
                                    if (id === schedules[i].id) {
                                        let delete_sechedules = temp.filter((v:any) => {
                                            return id != v.id;
                                        })
                                        setSchedules(delete_sechedules);
                                        setTimeTable({
                                            name: "test12",
                                            ownerId: cookie.uid,
                                            description: "test12의 시간표",
                                            schedules: schedules
                                        })
                                    }
                                }
                                setToggle(!toggle)
                                console.log("삭제 한 후 schedules", schedules);
                            }}>삭제</button>
                        </div>
                    }></Modal>
                    
                    : // info.className가 false일 때 일정 추가하기로
                    <Modal title={"일정 추가하기"} closeEvent={() => { setToggle(false); }} element={
                        <div>
                            <p>수업명 : <input type={"text"} value={classtext} onChange={Saveclass} autoFocus/></p>
                            <p>장소 : <input type={"text"} value={wheretext} onChange={Savewhere}/></p>
                            <p>요일 : {info.week}</p>
                            <p>시작시간 : {info.startTime}</p>
                            <p>종료시간 : {
                                <select value={getstartTime} onChange={Saveend}>
                                    <option value={10} >10시</option>
                                    <option value={11} >11시</option>
                                    <option value={12} >12시</option>
                                    <option value={13} >13시</option>
                                    <option value={14} >14시</option>
                                    <option value={15} >15시</option>
                                    <option value={16} >16시</option>
                                    <option value={17} >17시</option>
                                    <option value={18} >18시</option>
                                </select>}</p>
                            <button type='button' onClick={() => {
                                if (classtext != "" && wheretext != "") {
                                    if (getstartTime >= tempstarTime) {
                                        let set = [...schedules, {
                                            id: id,
                                            className: classtext,
                                            where: wheretext,
                                            week: week,
                                            startTime: startTime,
                                            endTime: getstartTime
                                        }]
                                        setSchedules(set)
                                        setTimeTable({
                                            name: "test12",
                                            ownerId: cookie.uidToken,
                                            description: "test12의 시간표",
                                            schedules: schedules
                                        })
                                        setClasstext("")
                                        setWheretext("")
                                        setId(id + 1)
                                        setToggle(!toggle)
                                    }
                                    else {
                                        alert("종료시간이 시작시간보다 작거나 같습니다.")
                                    }
                                }
                                else {
                                    alert("수업명 또는 장소를 입력하지 않았습니다.")
                                }
                                console.log(info);
                            }}>저장</button>
                        </div>
                    }></Modal>
                )
            }
            <Header />
            <div className="mtt-container">
                <Sidebar />
                <div className="mtt-body">
                    <h1>내 시간표</h1>
                    <TimeCell style={{ width: "600px", height: "700px" }} readonly={false} time_table={timeTable} clickEvent={(info: any) => {
                        setToggle(true);
                        setInfo(info);
                        setGetstartTime(info.startTime+1);
                        setTempstartTime(info.startTime+1)
                        setStartTime(info.startTime);
                        setEndtime(info.startTime+1)
                        setWeek(info.week);
                        console.log("받은 endTime", endTime)
                    }} />
                </div>
            </div>

        </div>
    );
}

export default MyTimeTable;