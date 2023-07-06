import { ReactNode, useEffect, useRef } from "react";
import './styles.css';


interface IModal {
    style?: any,
    element: ReactNode,
    title?: String,
    closeEvent?: Function,
}

function Modal(props: IModal) {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        modalRef.current?.focus();
    }, []);

    return (
        <div className="Modal" ref={modalRef} tabIndex={0} autoFocus onKeyUp={(e) => {
            if (e.key === "Escape") {
                props.closeEvent!();
            }
        }}>
            <div className="overlay"></div>
            <div className="modal-body">
                <div className="modal-header">
                    <div className="title-wrapper">
                        <div className="title">{props.title}</div>
                    </div>
                    <div className="close" onClick={() => { props.closeEvent && props.closeEvent(); }}>X</div>
                </div>
                <div className="modal-element">
                    {props.element}
                </div>

            </div>
        </div>
    )
}

export default Modal;