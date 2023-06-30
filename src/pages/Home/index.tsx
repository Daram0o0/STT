import React, { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../../components/Modal'
import { time_table, schedule } from '../../interfaces';
import Header from '../../components/Header';
import OpenModal from '../../components/Modal/OpenModal';

function Home() {
    const [schedules, setSchedules] = useState<schedule[]>([])

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
    },[schedules])

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
                        if (info.id != undefined && info.where != undefined && info.where != undefined) {
                            let tempboolean = true;
                            setModal(tempboolean);
                            if (modal === true) {
                                console.log("modal창 뜨게 하기")
                                console.log("info",info);
                                console.log("id",info.id);
                                console.log("where",info.where);
                                console.log("className",info.className);
                                <OpenModal></OpenModal>
                            }
                            else {
                                console.log("modal창 안뜨지요");
                            }
                        }
                        else {
                            console.log("아무것도 없는 부분");
                        }
                    }}></TimeCell>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;