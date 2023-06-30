import { ReactNode, useCallback, useEffect, useState } from "react";
import './styles.css';
import Openmodal from './TimeTableChange';

// function Modal(props: any) {
//     const [modal, setModal] = useState<boolean>(props.toggle);
//     const [isOpenModal, setOpenModal] = useState<boolean>(false);

//     function toggleModal() {
//         setModal(!modal)
//     }
//     if (modal) {

//         document.body.classList.add('active-modal')
//     } else {
//         document.body.classList.remove('active-modal')
//     }

//     useEffect(() => {
//         setModal(props.toggle);
//     }, [props])

//     return (
//         <div>
//             {/* <button onClick={toggleModal}>시간표 추가하기</button> */}

//             {modal && (
//                 <div className="Modal">
//                     <div onClick={toggleModal} className="overlay"></div>
//                     <div className="modal-content">
//                         <h2>시간표 추가</h2>
//                         <Openmodal toggleModal={toggleModal} schedules={props.schedules} setSchedules={props.setSchedules} time_table={props.time_table} setTime_table={props.setTime_table}></Openmodal>
//                         <button className="close-modal" onClick={toggleModal}> X </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

interface IModal {
    style?: any,
    element: ReactNode,
}

function Modal(props: IModal) {
    return (
        <div className="Modal">
            <div className="overlay"></div>
            <div className="modal-body">
                {props.element}
            </div>
        </div>
    )
}

export default Modal;