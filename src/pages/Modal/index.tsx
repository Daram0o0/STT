import { useCallback, useState } from "react";
import './styles.css';
import Openmodal from'./OpenModal';

function OpenModal() {
    const [modal, setModal] = useState<boolean>(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);

    function toggleModal() {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }


    // const onClikToggleModal = useCallback(() => {
    //     setOpenModal(!isOpenModal);
    // }, [isOpenModal]);

    return(
        <div>
            <button onClick={toggleModal}>시간표 추가하기</button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>시간표 추가</h2>
                        <Openmodal></Openmodal>
                        <button className="close-modal" onClick={toggleModal}> X </button>
                    </div>
                </div>
            )}

            {/* {
                isOpenModal && (
                    <Modal onClickToggleModal={onClikToggleModal}>
                        이곳에 children이 들어갑니다.
                    </Modal>
                )
            }
            <button className="dialog" onClick={onClikToggleModal}>add time</button> */}
        </div>
    )
}

export default OpenModal;