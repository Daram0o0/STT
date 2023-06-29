import { time_table } from '../../interfaces';
import './styles.css'
import { useEffect, useRef, useState } from 'react';

interface ITimeCell {
  time_table?: time_table,
  style?: React.CSSProperties,
  readonly?: boolean,
}

function TimeCell(props: ITimeCell) {

  const colors = ["yellow", "skyblue", "orange", "aliceblue"];

  const [contains, setContains] = useState(
    [
      // 월 화 수 목 금 토 일
      ["", "", "", "", "", "", ""], // 9
      ["", "", "", "", "", "", ""], // 10
      ["", "", "", "", "", "", ""], // 11
      ["", "", "", "", "", "", ""], // 12
      ["", "", "", "", "", "", ""], // 13
      ["", "", "", "", "", "", ""], // 14
      ["", "", "", "", "", "", ""], // 15
      ["", "", "", "", "", "", ""], // 16
      ["", "", "", "", "", "", ""], // 17
      ["", "", "", "", "", "", ""], // 18
    ])

  const [text, setText] = useState(
    [
      // 월 화 수 목 금 토 일
      ["", "", "", "", "", "", ""], // 9
      ["", "", "", "", "", "", ""], // 10
      ["", "", "", "", "", "", ""], // 11
      ["", "", "", "", "", "", ""], // 12
      ["", "", "", "", "", "", ""], // 13
      ["", "", "", "", "", "", ""], // 14
      ["", "", "", "", "", "", ""], // 15
      ["", "", "", "", "", "", ""], // 16
      ["", "", "", "", "", "", ""], // 17
      ["", "", "", "", "", "", ""], // 18
    ])
  const week = ["", "월", "화", "수", "목", "금", "토", "일"];


  useEffect(() => {
    console.log("time_table : ", props.time_table);
    let schedules = props.time_table?.schedules;
    if (schedules != undefined) {
      let tempText = text;
      let tempContains = contains;
      for (let i = 0; i < schedules.length; i++) {
        console.log(i);
        let week = schedules[i].week;
        let startTime = schedules[i].startTime;
        let endTime = schedules[i].endTime;
        let className = schedules[i].className;
        let where = schedules[i].where;

        const block_color = colors[Math.floor(Math.random() * colors.length)];

        for (let j = 0; j < endTime - startTime + 1; j++) {
          tempContains[startTime - 9 + j][week] = block_color;
        }
        tempText[startTime - 9][week] = `${className}\n${where}`;
        console.log(tempText);
      }
      setText(tempText);
    }

  }, [props.time_table]);

  return (
    <div className="TimeCell" style={props.style} >
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
                      <div className="table-time" style={contains[0][i - 1] != "" ? props.readonly ? { backgroundColor: contains[0][i - 1], borderColor: contains[0][i - 1] }
                        : { backgroundColor: contains[0][i - 1], borderColor: contains[0][i - 1], cursor: "pointer" } : {}}>{text[0][i - 1]}</div>
                      <div className="table-time" style={contains[1][i - 1] != "" ? { backgroundColor: contains[1][i - 1], borderColor: contains[1][i - 1], cursor: "pointer" } : {}}>{text[1][i - 1]}</div>
                      <div className="table-time" style={contains[2][i - 1] != "" ? { backgroundColor: contains[2][i - 1], borderColor: contains[2][i - 1], cursor: "pointer" } : {}}>{text[2][i - 1]}</div>
                      <div className="table-time" style={contains[3][i - 1] != "" ? { backgroundColor: contains[3][i - 1], borderColor: contains[3][i - 1], cursor: "pointer" } : {}}>{text[3][i - 1]}</div>
                      <div className="table-time" style={contains[4][i - 1] != "" ? { backgroundColor: contains[4][i - 1], borderColor: contains[4][i - 1], cursor: "pointer" } : {}}>{text[4][i - 1]}</div>
                      <div className="table-time" style={contains[5][i - 1] != "" ? { backgroundColor: contains[5][i - 1], borderColor: contains[5][i - 1], cursor: "pointer" } : {}}>{text[5][i - 1]}</div>
                      <div className="table-time" style={contains[6][i - 1] != "" ? { backgroundColor: contains[6][i - 1], borderColor: contains[6][i - 1], cursor: "pointer" } : {}}>{text[6][i - 1]}</div>
                      <div className="table-time" style={contains[7][i - 1] != "" ? { backgroundColor: contains[7][i - 1], borderColor: contains[7][i - 1], cursor: "pointer" } : {}}>{text[7][i - 1]}</div>
                      <div className="table-time" style={contains[8][i - 1] != "" ? { backgroundColor: contains[8][i - 1], borderColor: contains[8][i - 1], cursor: "pointer" } : {}}>{text[8][i - 1]}</div>
                      <div className="table-time" id="last-table-time" style={contains[9][i - 1] != "" ? { backgroundColor: contains[9][i - 1], borderColor: contains[9][i - 1], cursor: "pointer" } : {}}>
                        {text[9][i - 1]}
                      </div>
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