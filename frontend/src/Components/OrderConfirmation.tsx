import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface OrderConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}

export const OrderConfirmationModal = ({show, onHide, onConfirm}: OrderConfirmationModalProps) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to order this one?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
