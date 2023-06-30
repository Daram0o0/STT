import { useCallback, useState } from "react";
import './styles.css';
import Openmodal from'./OpenModal';

function Modal(props:any) {
    const [modal, setModal] = useState<boolean>(false);

    function toggleModal() {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    return(
        <div>
            <button onClick={toggleModal}>시간표 추가하기</button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>시간표 추가</h2>
                        <Openmodal toggleModal={toggleModal} schedules={props.schedules} setSchedules={props.setSchedules} time_table={props.time_table} setTime_table={props.setTime_table}></Openmodal>
                        <button className="close-modal" onClick={toggleModal}> X </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal;