import { useState } from "react";

function ModalDetail() {

    let [test, setTest] = useState<Number>(1);

    return(
        // <form className="form" style = {{display: 'block', left: '537px'}}>
        //     <dl>
        //         <dt>과목명</dt>
        //         <dd>
        //             <input type={"text"} placeholder="강의명"></input>
        //         </dd>
        //         <dt>시간/장소</dt>
        //         <dd className="timeplaces">
        //             <div className="timeplace">
        //                 <ol className="weeks">
        //                     <li className={ test == 1 ? "active" : ""} onClick={() => {setTest(1)}}>월</li>
        //                     <li className={ test == 2 ? "active" : ""} onClick={() => {setTest(2)}}>화</li>
        //                     <li className={ test == 3 ? "active" : ""} onClick={() => {setTest(3)}}>화</li>
        //                     <li className={ test == 4 ? "active" : ""} onClick={() => {setTest(4)}}>목</li>
        //                     <li className={ test == 5 ? "active" : ""} onClick={() => {setTest(5)}}>금</li>
        //                     <li className={ test == 6 ? "active" : ""} onClick={() => {setTest(6)}}>토</li>
        //                     <li className={ test == 7 ? "active" : ""} onClick={() => {setTest(7)}}>일</li>
        //                 </ol>
        //             </div>
        //             <input type={"text"}></input>
        //         </dd>
        //     </dl>
        //     <div>추가하기</div>
        // </form>
        <form className="formcon">
            <dl className="dltest">
                <dt>과목명</dt>
                <dd>
                    <input type={"text"} placeholder="강의명"></input>
                </dd>
                <dt>시간 / 장소</dt>
                <dd className="ddtest">
                    <div className="divtest">
                        <ol className="oltest">
                            <li className={ test == 1 ? "active" : ""} onClick={() => {setTest(1)}}>월</li>
                            <li className={ test == 2 ? "active" : ""} onClick={() => {setTest(2)}}>화</li>
                            <li className={ test == 3 ? "active" : ""} onClick={() => {setTest(3)}}>수</li>
                            <li className={ test == 4 ? "active" : ""} onClick={() => {setTest(4)}}>목</li>
                            <li className={ test == 5 ? "active" : ""} onClick={() => {setTest(5)}}>금</li>
                            <li className={ test == 6 ? "active" : ""} onClick={() => {setTest(6)}}>토</li>
                            <li className={ test == 7 ? "active" : ""} onClick={() => {setTest(7)}}>일</li>
                        </ol>
                        <input type={"text"} placeholder="장소"></input>

                    </div>
                </dd>
            </dl>
        </form>
    )
}

export default ModalDetail;