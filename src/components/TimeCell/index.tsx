import { ITimeCell, info, time_table } from '../../interfaces';
import './styles.css'
import { useEffect, useRef, useState } from 'react';



function TimeCell(props: ITimeCell) {

  const colors = ["yellow", "skyblue", "orange", "indianred", "burlywood", "coral", "greenyellow"];

  const defaultInfos: info[][] =
    ([
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
    ]);

  const [infos, setInfos] = useState<info[][]>(
    defaultInfos
  )
  const week = ["", "월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {

    let schedules = props.time_table?.schedules;
    if (schedules != undefined) {

      let tempInfos: info[][] = defaultInfos;
      let startColor = Math.floor(Math.random() * colors.length);

      for (let i = 0; i < schedules.length; i++) {
        let id = schedules[i].id;
        let week = schedules[i].week;
        let startTime = schedules[i].startTime;
        let endTime = schedules[i].endTime;
        let className = schedules[i].className;
        let where = schedules[i].where;

        const block_color = colors[(startColor + i) % colors.length];

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

          tempInfos[startTime - 9 + j][week] = temp;
        }

        tempInfos[startTime - 9][week].text = `${className}\n${where}`;
      }
      setInfos(tempInfos);
    }

  }, [props]);

  return (
    <div className="TimeCell" style={props.style} >
      <table>
        <tbody>
          <tr>
            {week.map((v, i) => {
              return (
                <td key={i}>
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
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => {
                          return <div key={idx} className="table-time" style={infos[num][i - 1].id != undefined ? { backgroundColor: infos[num][i - 1].color!, borderColor: infos[num][i - 1].color!, cursor: `${props.readonly ? "default" : "pointer"}` } : {}} onClick={() => { props.clickEvent && props.clickEvent(infos[num][i - 1]); }}>{infos[num][i - 1].text}</div>
                        })}
                        <div className="table-time" id="last-table-time" style={infos[9][i - 1].id != undefined ? { backgroundColor: infos[9][i - 1].color!, cursor: `${props.readonly ? "default" : "pointer"}` } : {}} onClick={() => { props.clickEvent && props.clickEvent(infos[9][i - 1]); }}>{infos[9][i - 1].text}</div>
                      </div>
                    }
                  </div>
                </td>
              )
            })
            }
          </tr>
        </tbody>
      </table>
    </div >
  )
}


export default TimeCell;