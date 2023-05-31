import { useState } from "react";
import { JsxElement } from "typescript";

function Test(props?: any) {

    let [select, setSelect] = useState<Number>(1);

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
            <div className="container">
                <div className="subject">
                    과목명
                    <input type={"text"} placeholder="강의명"></input>
                    {/* <div className="delete"> */}
                        {props.delete}
                    {/* </div> */}
                </div>
                <div className="time/place">시간 / 장소
                    <input type={"text"} placeholder="장소"></input>
                </div>
                <div className="select">
                    <ol className="ol">
                        <li className={ select == 1 ? "active" : ""} onClick={() => {setSelect(1)}}>월</li>
                        <li className={ select == 2 ? "active" : ""} onClick={() => {setSelect(2)}}>화</li>
                        <li className={ select == 3 ? "active" : ""} onClick={() => {setSelect(3)}}>수</li>
                        <li className={ select == 4 ? "active" : ""} onClick={() => {setSelect(4)}}>목</li>
                        <li className={ select == 5 ? "active" : ""} onClick={() => {setSelect(5)}}>금</li>
                        <li className={ select == 6 ? "active" : ""} onClick={() => {setSelect(6)}}>토</li>
                        <li className={ select == 7 ? "active" : ""} onClick={() => {setSelect(7)}}>일</li>
                        <div className="timeselect">
                            {/* <label></label> */}
                            <select className="starttime">
                                <option value={"9"}>9시</option>
                                <option value={"10"}>10시</option>
                                <option value={"11"}>11시</option>
                                <option value={"12"}>12시</option>
                                <option value={"13"}>13시</option>
                                <option value={"14"}>14시</option>
                                <option value={"15"}>15시</option>
                                <option value={"16"}>16시</option>
                                <option value={"17"}>17시</option>
                                <option value={"18"}>18시</option>
                                <option value={"19"}>19시</option>
                                <option value={"20"}>20시</option>
                                <option value={"21"}>21시</option>
                            </select>
                            <span>~</span>
                            <select className="endtime">
                                <option value={"9"}>9시</option>
                                <option value={"10"} selected>10시</option>
                                <option value={"11"}>11시</option>
                                <option value={"12"}>12시</option>
                                <option value={"13"}>13시</option>
                                <option value={"14"}>14시</option>
                                <option value={"15"}>15시</option>
                                <option value={"16"}>16시</option>
                                <option value={"17"}>17시</option>
                                <option value={"18"}>18시</option>
                                <option value={"19"}>19시</option>
                                <option value={"20"}>20시</option>
                                <option value={"21"}>21시</option>
                            </select>
                        </div>
                    </ol>
                </div>
            </div>
    )
}

function ModalDetail() {

    let [tem, setTem] = useState<JSX.Element[]>([]);

    return(
        <form>
            <Test></Test>
            {tem.map((index, key) => (
                <div>{index}</div>
            ))}
            <button type="button" onClick={() => {
                setTem([...tem, <Test delete={<button type="button" className="delete" onClick={() => {
                    console.log(tem, tem.length);
                    let temp2 = tem.splice(tem.length-1, 1)
                    setTem(tem);
                    console.log(temp2);
                }}>삭제</button>}></Test>])
            }}>추가하기</button>
            <button type="submit">저장</button>
        </form>
    )
}

export default ModalDetail;