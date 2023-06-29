import React from 'react';
import { useState } from 'react';
import './styles.css';
import { createRoom } from '../../service/tableDB';
import TimeCell from '../../components/TimeCell';
import Modal from '../Modal/index'

function Home() {

    const [tables, setTables] = useState({});

    return (
        <div className='Home'>
            <div className='top'>
                <div className='top_1'>
                    홈화면
                </div>
                <Modal />
            </div>
            <div className='middle'>
                <div className='middle_1'>
                    {/* 여기에 공용 시간표가 보이게 하기 */}
                    <TimeCell></TimeCell>

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