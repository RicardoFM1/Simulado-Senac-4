import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, handleClose, handleConfirm, title, message }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || "Confirmar Exclusão"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message || "Você tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
