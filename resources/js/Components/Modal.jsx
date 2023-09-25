import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

ReactModal.setAppElement("#app");

const style = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

function Modal({ modalIsOpen, onRequestClose, children }) {
    return (
        <ReactModal
            style={style}
            isOpen={modalIsOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
        >
            <button className="float-right" onClick={onRequestClose}>
                <AiOutlineClose />
            </button>
            {children}
        </ReactModal>
    );
}

export default Modal;
