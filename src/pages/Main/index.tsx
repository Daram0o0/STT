import './styles.css';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TimeCell from '../../components/TimeCell';

function Card(props: any) {

  const style = {
    width: props.width,
    height: props.height,
  }
  return (
    <div className="card" style={style}>
      <div className="card-title">{props.title}</div>
      {
        props.element
      }
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
            <Card width="640px" height="570px" title="내 시간표" element={
              <TimeCell />
            } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;