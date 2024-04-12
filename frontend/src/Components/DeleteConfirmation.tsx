import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmationModal = ({show, onHide, onConfirm}: DeleteConfirmationModalProps) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
