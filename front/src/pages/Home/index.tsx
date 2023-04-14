import React from 'react';
import './styles.css';

function Home() {
    return(
        <div className='Home'>
            <div className='top'>
                <div className='top_1'>
                    홈화면
                </div>
            </div>
            <div className='middle'> 
                <div className='middle_1'>
                    여기에 공용 시간표가 보이게 하기
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom-box'>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>내 시간표</a>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>| 홈</a>
                    <a href="" style={{textDecoration:"none",color:"gray"}}>| 설정</a>
                </div>
            </div>
        </div>
    );
}

export default Home;