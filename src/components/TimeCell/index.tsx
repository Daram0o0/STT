import './styles.css'
import { useState } from 'react';

function TimeCell(props?: any) {

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
    <div className="TimeCell">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td>토</td>
            <td>일</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>09:00 ~ 10:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>10:00 ~ 11:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>11:00 ~ 12:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>12:00 ~ 13:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>12:00 ~ 13:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>13:00 ~ 14:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>15:00 ~ 16:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>17:00 ~ 18:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>19:00 ~ 20:00</td>
            {TimeCell()}
          </tr>
          <tr>
            <td>20:00 ~ 21:00</td>
            {TimeCell()}
          </tr>
        </tbody>

      </table>
    </div>
  )
}

export default TimeCell;