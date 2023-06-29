import './styles.css';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TimeCell from '../../components/TimeCell';

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
          <div className="notice" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}> 7월 20일 까지 완성하기!</div>
          <div className="cards">
            <Card width={600} title="내 시간표" style={{ cursor: "pointer" }} element={
              <TimeCell readonly={true} time_table={{
                name: "",
                ownerId: "",
                description: "",
                schedules: [
                  {
                    id: 0,
                    className: "프밍언어 1",
                    where: "1-432",
                    week: 3,
                    startTime: 9,
                    endTime: 12,
                  }
                ]
              }} />
            } />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;