import React from 'react';
import './styles.css';

function Home() {
    return(
        <div className='Home'>
            <div className='top'>
                홈화면
            </div>
            <div className='middle'>
                여기에 공용 시간표가 보이게 하기
            </div>
            <div className='bottom-box'>
                <button type='button' className='bottom-my' onClick={() => {console.log("내 시간표")}}>
                    내 시간표
                </button>
                <button type='button' className='bottom-home' onClick={() => {console.log("Home")}}>
                    Home
                </button>
                <button type='button' onClick={() => {console.log("설정")}}> 설정 </button>
            </div>
        </div>
    );
}

export default Home;