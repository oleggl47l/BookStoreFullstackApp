import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { OrderItemRequest } from '../../Services/forAdmin/orderItems.tsx';
import { useEffect, useState } from 'react';

interface Props {
    mode: Mode;
    values: OrderItems;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleUpdate: (id: string, request: OrderItemRequest) => void;
}

export enum Mode {
    Edit,
}

export const UpdateOrderItem = ({ mode, values, isModalOpen, handleCancel, handleUpdate }: Props) => {
    const [orderId, setOrderId] = useState<string>('');
    const [bookId, setBookId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setOrderId(values.orderId);
        setBookId(values.bookId);
        setQuantity(values.quantity);
        setPrice(values.price);
    }, [values]);

    const handleOnOk = async () => {
        const orderItemRequest: OrderItemRequest = { orderId, bookId, quantity, price };
        handleUpdate(values.orderItemId, orderItemRequest);
    };

    return (
        <Modal show={isModalOpen} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === Mode.Edit ? 'Edit Order Item' : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="bookId">
                        <Form.Label>Book ID</Form.Label>
                        <Form.Control type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleOnOk}>
                    {mode === Mode.Edit ? 'Save' : ''}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
