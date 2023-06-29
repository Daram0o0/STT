import { time_table } from '../../interfaces';
import './styles.css'
import { useEffect, useRef, useState } from 'react';

interface ITimeCell {
  time_table?: time_table,
  style?: React.CSSProperties,
  readonly?: boolean,
  clickEvent?: Function,
}

interface info {
  id?: number,
  week?: number,
  startTime?: number,
  endTime?: number,
  className?: String,
  where?: String,
  color?: string,
  text?: string,
}

function TimeCell(props: ITimeCell) {

  const colors = ["yellow", "skyblue", "orange", "aliceblue"];

  const [infos, setInfos] = useState<info[][]>(
    [
      // 월 화 수 목 금 토 일
      [{}, {}, {}, {}, {}, {}, {}], // 9
      [{}, {}, {}, {}, {}, {}, {}], // 10
      [{}, {}, {}, {}, {}, {}, {}], // 11
      [{}, {}, {}, {}, {}, {}, {}], // 12
      [{}, {}, {}, {}, {}, {}, {}], // 13
      [{}, {}, {}, {}, {}, {}, {}], // 14
      [{}, {}, {}, {}, {}, {}, {}], // 15
      [{}, {}, {}, {}, {}, {}, {}], // 16
      [{}, {}, {}, {}, {}, {}, {}], // 17
      [{}, {}, {}, {}, {}, {}, {}], // 18
    ]
  )

  const [ids, setIds] = useState(
    [
      // 월 화 수 목 금 토 일
      [0, 0, 0, 0, 0, 0, 0], // 9
      [0, 0, 0, 0, 0, 0, 0], // 10
      [0, 0, 0, 0, 0, 0, 0], // 11
      [0, 0, 0, 0, 0, 0, 0], // 12
      [0, 0, 0, 0, 0, 0, 0], // 13
      [0, 0, 0, 0, 0, 0, 0], // 14
      [0, 0, 0, 0, 0, 0, 0], // 15
      [0, 0, 0, 0, 0, 0, 0], // 16
      [0, 0, 0, 0, 0, 0, 0], // 17
      [0, 0, 0, 0, 0, 0, 0], // 18
    ])

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
      let tempIds = ids;
      for (let i = 0; i < schedules.length; i++) {
        console.log(i);
        let id = schedules[i].id;
        let week = schedules[i].week;
        let startTime = schedules[i].startTime;
        let endTime = schedules[i].endTime;
        let className = schedules[i].className;
        let where = schedules[i].where;

        const block_color = colors[Math.floor(Math.random() * colors.length)];


        for (let j = 0; j < endTime - startTime + 1; j++) {
          let temp = {
            id: id,
            week: week,
            startTime: startTime,
            endTime: endTime,
            className: className,
            where: where,
            color: block_color,
            text: "",
          }

          infos[startTime - 9 + j][week] = temp;
        }
        infos[startTime - 9][week].text = `${className}\n${where}`;

      }
      setText(tempText);
      setContains(tempContains);
      setIds(tempIds);
    }

  }, [props]);

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
                      {/* <div className="table-time" style={infos[0][i - 1].id ? props.readonly ? { backgroundColor: infos[0][i - 1].color!, borderColor: contains[0][i - 1] }
                        : { backgroundColor: contains[0][i - 1], borderColor: contains[0][i - 1], cursor: "pointer" } : {}} onClick={() => { props.clickEvent && props.clickEvent(infos[0][i - 1]); }}>{text[0][i - 1]}</div>
                     */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => {
                        return <div className="table-time" style={infos[v][i - 1].id ? { backgroundColor: infos[v][i - 1].color!, borderColor: infos[v][i - 1].color!, cursor: "pointer" } : {}} onClick={() => { props.clickEvent && props.clickEvent(infos[v][i - 1]); }}>{infos[v][i - 1].text}</div>
                      })}
                      <div className="table-time" id="last-table-time" style={infos[9][i - 1].id ? { backgroundColor: infos[9][i - 1].color!, borderColor: infos[9][i - 1].color!, cursor: "pointer" } : {}} onClick={() => { props.clickEvent && props.clickEvent(infos[9][i - 1]); }}>{infos[9][i - 1].text}</div>

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