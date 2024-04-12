import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { OrderRequest } from '../../Services/forAdmin/orders.tsx';
import {useEffect, useState} from "react";

interface Props {
    mode: Mode;
    values: Orders;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleUpdate: (id: string, request: OrderRequest) => void;
}

export enum Mode {
    Edit,
}

export const UpdateOrder = ({ mode, values, isModalOpen, handleCancel, handleUpdate }: Props) => {
    const [orderDate, setOrderDate] = useState<Date>(new Date());
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        setOrderDate(new Date(values.orderDate));
        setTotalAmount(values.totalAmount);
        setUserId(values.userId);
    }, [values]);

    const handleOnOk = async () => {
        const orderRequest: OrderRequest = { orderDate, totalAmount, userId };
        handleUpdate(values.orderId, orderRequest);
    };

    return (
        <Modal show={isModalOpen} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === Mode.Edit ? 'Edit Order' : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="totalAmount">
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control type="number" value={totalAmount} onChange={(e) => setTotalAmount(parseFloat(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId="userId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
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
