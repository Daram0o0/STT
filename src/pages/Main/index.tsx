import './styles.css';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TimeCell from '../../components/TimeCell';
import { addTimeTable, getTimeTable } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { time_table } from '../../interfaces';
import Modal from '../../components/Modal';
import OpenModal from '../../components/Modal/TimeTableChange';

interface ICard {
  width: Number,
  height: Number,
}

function Card(props: any) {

  const [hover, setHover] = useState(false);
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const expandSize = 10;
  // const [marginLeft, setMarginLeft] = useState(0);
  // const [marginRight, setMarginRight] = useState(0);

  let style = {
    width: width + "px",
    height: height + "px",

    // marginLeft: marginLeft + "px",
    // marginRight: marginRight + "px",
  }

  return (
    <div className="card"
      // style={{ width: props.width + expandSize + 40 + "px", height: props.height + expandSize + 40 + "px" }}
      style={style}>
      <div className="card-content"
      // style={style}
      >
        <div className="card-title">{props.title}</div>
        <div className="element">
          {props.element}
        </div>

      </div>
    </div>
  )
}

function Main() {
  const txt = "Shared-Time-Table";
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);
  const [cookie] = useCookies();
  const [currentInfo, setCurrentInfo] = useState({});

  const [testTT, setTestTT] = useState<time_table>({
    name: "",
    ownerId: "",
    description: "",
    schedules: []
  });

  useEffect(() => {
    if (cookie.uidToken != undefined) {
      getTimeTable(cookie.uidToken).then((time_table) => {
        console.log("time_Table : ", time_table);
        setTestTT(time_table);
      })
    }

  }, [])

  const [displayAccountPopup, setDisplayAccountPopup] = useState(false);

  return (
    <div className="Main" onClick={(e) => {
      e.preventDefault();
      setDisplayAccountPopup(false);
    }}>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">
          {toggleModal && <Modal element={<div>Hello</div>} />}
          <div className="notice" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}> 7월 20일 까지 완성하기!</div>
          <button onClick={() => {
            console.log(testTT);
            let temp = {
              name: "qwer's timetable",
              ownerId: cookie.uidToken,
              description: "qwer's timetable for college",
              schedules: [
                {
                  id: 0,
                  className: "사진학 1",
                  where: "3-432",
                  week: 3,
                  startTime: 11,
                  endTime: 15,
                },
                {
                  id: 1,
                  className: "철학 1",
                  where: "5-222",
                  week: 1,
                  startTime: 11,
                  endTime: 15,
                },
                {
                  id: 2,
                  className: "히오스 1",
                  where: "5-432",
                  week: 2,
                  startTime: 10,
                  endTime: 14,
                },
                {
                  id: 3,
                  className: "리눅스 1",
                  where: "1-409",
                  week: 4,
                  startTime: 13,
                  endTime: 18,
                }
              ]
            };
            setTestTT(temp)
            addTimeTable(cookie.uidToken, temp);

            console.log(testTT);
          }}> 시간표 추가 테스트</button>
          <div className="cards">
            <Card width={600} title="내 시간표" style={{ cursor: "pointer" }} element={
              <TimeCell readonly={false} time_table={testTT} clickEvent={(info) => {
                setToggleModal(true);
                setCurrentInfo(info);
                console.log(info);
              }} />
            } />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;