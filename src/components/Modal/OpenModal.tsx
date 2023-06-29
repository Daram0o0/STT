import { useState, useEffect, PropsWithChildren } from "react";
import { JsxElement } from "typescript";
import {useRef} from "react";
import { time_table, schedule } from "../../interfaces";
import { HasMatchFunction } from "@reduxjs/toolkit/dist/tsHelpers";
import { useResolvedPath } from "react-router";

function OpenModal(props: any) {

    const [id, setId] = useState<number>(0); // 수업 구분할 id값
    const [classtext, setClasstext] = useState<string>(""); // 강의명
    const [wheretext, setWheretext] = useState<string>(""); // 강의실 위치
    const [week, setWeek] = useState<number>(1); // 요일
    const [startTime, setStartTime] = useState<number>(9); // 시작 시간
    const [endTime, setEndtime] = useState<number>(10); // 끝나는 시간
    const time_list = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]; // 시간 리스트
    let [schedule, setSchedule] = useState<schedule[]>([])

    // 고유의 id값을 타임셀에서 받아와서 저장할곳.
    let [getid, setGetid] = useState<number>(0);

    // setTem([...tem, props.time]);

    // time_table 인터페이스 선언
    let [time_table, setTime_table] = useState<time_table>({
        name: "test",
        ownerId: "",
        description: "",
        schedules: schedule
    });

    // state값들이 변할 때 마다 schedule값에 들어가도록 새로 렌더링
    useEffect(()=>{
        props.setTime(
            {
                id: id, // 수업 구분할 id값
                className: classtext, // 수업 이름
                where: wheretext, // 수업 장소
                week: week, // 수업 요일
                startTime: startTime, // 수업 시작 시간
                endTime: endTime // 수업 종료 시간
            }
        )
    },[classtext, wheretext, week, startTime, endTime]);

    // console.log(props.time)

    // 수업 이름 저장 함수
    function Saveclass(e:any) {
        setClasstext(e.target.value);
    }

    // 교실 위치 저장 함수
    function Savewhere(e:any) {
        setWheretext(e.target.value);
    }
    
    // 수업 요일 저장함수
    function Saveweek(week:number) {
        setWeek(week);
    }

    // 시작 시간 저장 함수
    function Savestart(e:any) {
        setStartTime(Number(e.target.value));
    }

    // 종료 시간 저장 함수
    function Saveend(e:any) {
        setEndtime(Number(e.target.value));
    }

    return(
    <>
    <div className="container">
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
        </div>
        <div>
            {/* 저장 구현 부분 */}
            <button type = "button" onClick={() => {
                let temp = [...schedule, props.schedule] // schedule배열에 새로운 schedule을 추가한 배열을 temp에 저장
                setSchedule(temp); // 저장한 배열을 state에 할당
                setTime_table({
                    name: "test",
                    ownerId: "",
                    description: "",
                    schedules: schedule // schedule를 새로 state에 저장
                })
                setId(id + 1); // id값을 1증가
                console.log(id);
                console.log(time_table.schedules);
            }}>저장</button>

            {/* 수정 구현 부분 */}
            <button type = "button" onClick={() => {
                let id = props.id // props로 id값을 받아온 후 저장
                setGetid(id); // 받은 id값을 state에 할당
                let temp = schedule
                // 반복문을 사용해서 id값과 같은 곳을 찾는다.
                for (let i = 0; i <= schedule.length; i++) {
                    // 찾은 후 수정
                    if (id === schedule[i].id) {
                        temp[i].id = id
                    }
                }
            }}>수정</button>

            {/* 삭제 구현 부분 */}
            <button type = "button" onClick={() => {
                let temp = schedule; // schedule을 temp에 저장
                let id = props.id; // props로 받은 id값을 id에 저장
                console.log(temp);
                // 반복문을 사용해서 id값과 같은 곳을 찾는다.
                for (let i = 0; i <= schedule.length; i++) {
                    // 찾은 후 삭제
                    if (id === schedule[i].id) {
                        // 삭제한 값을 delete_sechedules에 저장
                        let delete_sechedules = temp.filter((v)=> {
                            return id != v.id;
                        })
                        setTime_table({
                            name: "test",
                            ownerId: "",
                            description: "",
                            schedules: delete_sechedules // delete_sechedules을 새로 state에 저장
                        })
                    }
                }
                // console.log(time_table.schedules);
            }}>삭제</button>
        </div>
    </>
    )
}

function ModalDetail(props:any) {

    // schedule 인터페이스 선언
    let [schedule, setSchedule] = useState<schedule>({
        id : 0, // 수업 구분할 id값
        className: "", // 수업 이름
        where: "", // 수업 장소
        week: 1, // 수업 요일
        startTime: 9, // 수업 시작 시간
        endTime: 10 // 수업 종료 시간
    })
    const scrollRef = useRef();

    return(
        <div>
            <OpenModal setTime = {setSchedule} schedule = {schedule}></OpenModal>
            {/* {tem.map((index, key) => {
                return (
                    <Test id={index} delete={(key:number) => {
                        let temp = tem;
                        temp.filter((v) => {
                            return v !== key;
                        })
                        setTem(temp);
                    }}></Test>
                )
            })} */}
        </div>
    )
}

export default ModalDetail;