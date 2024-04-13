import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState} from "react";
import {DeleteConfirmationModal} from "../DeleteConfirmation";

interface AdminOrderItemCardProps {
    orderItem: OrderItems;
    handleDelete: (id: string) => void;
    handleOpen: (orderItem: OrderItems) => void;
}

export const AdminOrderItemCard = ({orderItem, handleDelete, handleOpen}: AdminOrderItemCardProps) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        handleDelete(orderItem.orderItemId);
        setShowConfirmationModal(false);
    };

    return (
        <Card style={{width: '18rem'}} key={orderItem.orderItemId}>
            <Card.Body>
                <Card.Title>Order Item ID: {orderItem.orderItemId}</Card.Title>
                <Card.Text>
                    <strong>Order ID:</strong> {orderItem.orderId}<br/>
                    <strong>Book Id:</strong> {orderItem.bookId}<br/>
                    <strong>Quantity:</strong> {orderItem.quantity}<br/>
                    <strong>Price:</strong> {orderItem.price}<br/>
                </Card.Text>
                <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="primary" onClick={() => handleOpen(orderItem)}>Edit</Button>
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
