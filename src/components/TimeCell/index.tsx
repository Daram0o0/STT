import './styles.css'
import { useEffect, useRef, useState } from 'react';

function TimeCell(props?: any) {

  const timeCellRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLTableRowElement>(null);
  const tdRef = useRef<HTMLTableDataCellElement>(null);

  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [trHeight, setTrHeight] = useState(0);
  const [tdHeight, setTdHeight] = useState(0);

  const colors = ["yellow", "red", "black", "blue"];

  const [contains, setContains] = useState(
    [
      // 월 화 수 목 금 토 일
      ["", "yellow", "gray", "", "", "", ""], // 9
      ["", "yellow", "gray", "", "", "", ""], // 10
      ["", "", "gray", "", "", "", ""], // 11
      ["", "", "gray", "", "", "", ""], // 12
      ["", "", "", "", "", "", ""], // 13
      ["", "", "", "", "", "", ""], // 14
      ["", "", "", "", "", "", ""], // 15
      ["", "", "", "", "", "", ""], // 16
      ["", "", "", "", "", "", ""], // 17
      ["", "", "", "", "", "", ""], // 18
    ])
  const week = ["", "월", "화", "수", "목", "금", "토", "일"];

  function addTime() {
    console.log("모달창 뜨게 하기")
  }

  function TimeCell() {
    var arr = [];
    for (var i = 0; i < 7; i++) {
      arr.push(<td key={i} onClick={addTime}></td>)
    }
    return arr;
  }

  useEffect(() => {
    setCellWidth(timeCellRef.current?.clientWidth! / 8);
    setCellHeight(timeCellRef.current?.clientHeight! / 11);
    setTrHeight(trRef.current?.clientHeight!);
    setTdHeight(tdRef.current?.clientHeight!);
    console.log(tdHeight);
  }, [timeCellRef.current?.clientWidth, timeCellRef.current?.clientHeight]);

  // function Test() {
  //   let [test, setTest] = useState(["09:00 ~ 10:00", "10:00 ~ 11:00", "11:00 ~ 12:00", "12:00 ~ 13:00", 
  //   "12:00 ~ 13:00", "13:00 ~ 14:00", "14:00 ~ 15:00", "15:00 ~ 16:00", "16:00 ~ 17:00","17:00 ~ 18:00",
  //   "18:00 ~ 19:00", "19:00 ~ 20:00", "20:00 ~ 21:00"]);
  //   return (
  //     <div>
  //       {test.map((time) => {
  //         return(
  //           <tr>
  //             <td>{time}</td>
  //             <td></td>
  //           </tr>
  //         )
  //       })}
  //     </div>
  //   )
  // }


  return (
    <div className="TimeCell" style={props.style} ref={timeCellRef}>
      <table>
        <tbody>
          {week.map((v, i) => {
            return (
              <td>
                <div className="table-week">
                  <div className="table-week-head"> {v}</div>
                  {i == 0 ?
                    <div className="table-times">
                      <div className="table-time">9</div>
                      <div className="table-time">10</div>
                      <div className="table-time">11</div>
                      <div className="table-time">12</div>
                      <div className="table-time">13</div>
                      <div className="table-time">14</div>
                      <div className="table-time">15</div>
                      <div className="table-time">16</div>
                      <div className="table-time">17</div>
                      <div className="table-time" id="last-table-time">18</div>
                    </div> :
                    <div className="table-times">
                      <div className="table-time" style={contains[0][i - 1] != "" ? { backgroundColor: contains[0][i - 1], borderColor: contains[0][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[1][i - 1] != "" ? { backgroundColor: contains[1][i - 1], borderColor: contains[1][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[2][i - 1] != "" ? { backgroundColor: contains[2][i - 1], borderColor: contains[2][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[3][i - 1] != "" ? { backgroundColor: contains[3][i - 1], borderColor: contains[3][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[4][i - 1] != "" ? { backgroundColor: contains[4][i - 1], borderColor: contains[4][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[5][i - 1] != "" ? { backgroundColor: contains[5][i - 1], borderColor: contains[5][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[6][i - 1] != "" ? { backgroundColor: contains[6][i - 1], borderColor: contains[6][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[7][i - 1] != "" ? { backgroundColor: contains[7][i - 1], borderColor: contains[7][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" style={contains[8][i - 1] != "" ? { backgroundColor: contains[8][i - 1], borderColor: contains[8][i - 1], cursor: "pointer" } : {}}></div>
                      <div className="table-time" id="last-table-time"></div>
                    </div>
                  }
                </div>
              </td>
            )
          })
          }
        </tbody>
      </table>
    </div >
  )
}

export default TimeCell;