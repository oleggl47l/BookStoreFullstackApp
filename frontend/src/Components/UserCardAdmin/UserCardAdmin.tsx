import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState} from "react";
import {DeleteConfirmationModal} from "../DeleteConfirmation";

interface AdminUserCardProps {
    user: User;
    handleDelete: (id: string) => void;
    handleOpen: (user: User) => void;
}

export const AdminUserCard = ({user, handleDelete, handleOpen}: AdminUserCardProps) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        handleDelete(user.userId);
        setShowConfirmationModal(false);
    };

    return (
        <Card style={{width: '18rem'}} key={user.userId}>
            <Card.Body>
                <Card.Title>User ID: {user.userId}</Card.Title>
                <Card.Text>
                    <strong>First Name:</strong> {user.firstName}<br/>
                    <strong>Last Name:</strong> {user.lastName}<br/>
                    <strong>Email:</strong> {user.email}<br/>
                    <strong>Role ID:</strong> {user.roleId}<br/>
                </Card.Text>
                <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="primary" onClick={() => handleOpen(user)}>Edit</Button>
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
