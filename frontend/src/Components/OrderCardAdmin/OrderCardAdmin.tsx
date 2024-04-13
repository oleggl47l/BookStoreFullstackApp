import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState} from "react";
import {DeleteConfirmationModal} from "../DeleteConfirmation";

interface AdminOrderCardProps {
    order: Orders;
    handleDelete: (id: string) => void;
    handleOpen: (order: Orders) => void;
}

export const AdminOrderCard = ({order, handleDelete, handleOpen}: AdminOrderCardProps) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        handleDelete(order.orderId);
        setShowConfirmationModal(false);
    };

    return (
        <Card style={{width: '18rem'}} key={order.orderId}>
            <Card.Body>
                <Card.Title>Order Item ID: {order.orderId}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {order.orderDate.toString()}<br/>
                    <strong>User Id:</strong> {order.userId}<br/>
                    <strong>Total Amount:</strong> {order.totalAmount}<br/>
                </Card.Text>
                <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="primary" onClick={() => handleOpen(order)}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteConfirmation}>Delete</Button>
                    <DeleteConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        onConfirm={handleDeleteConfirmed}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}
