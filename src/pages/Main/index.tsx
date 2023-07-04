import './styles.css';
import { useState, useEffect, ReactNode } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TimeCell from '../../components/TimeCell';
import { addTimeTable, getTimeTable } from '../../service/tableDB';
import { useCookies } from 'react-cookie';
import { time_table } from '../../interfaces';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

interface ICard {
  width?: Number,
  height?: Number,
  title?: String,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  style?: React.CSSProperties,
  element?: ReactNode,
}

function Card(props: ICard) {

  let style = {
    width: props.width + "px",
    height: props.height + "px",
    ...props.style,
  }

  return (
    <div className="card"
      style={style}
      onClick={props.onClick}>
      <div className="card-content">
        <div className="card-title">{props.title}</div>
        <div className="element">
          {props.element}
        </div>

      </div>
    </div>
  )
}

function Main() {
  const [cookie] = useCookies();

  const navigate = useNavigate();

  const [testTT, setTestTT] = useState<time_table>({
    name: "",
    ownerId: cookie.uidToken,
    description: "",
    schedules: []
  });

  useEffect(() => {
    if (cookie.uidToken != undefined) {
      addTimeTable(cookie.uidToken, testTT);

      getTimeTable(cookie.uidToken).then((time_table) => {
        console.log("time_Table : ", time_table);
        setTestTT(time_table);
      })
    }

  }, [])

  return (
    <div className="Main">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">
          <div className="notice" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}> 7월 20일 까지 완성하기!</div>
          <div className="cards">
            <Card width={600} title="내 시간표" style={{ cursor: "pointer" }} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.preventDefault();
              navigate("/mytimetable");
            }} element={
              <TimeCell readonly={true} time_table={testTT} />
            } />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;