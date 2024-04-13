// AdminRoleCard.tsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { DeleteConfirmationModal } from '../DeleteConfirmation';

interface AdminRoleCardProps {
    role: Roles;
    handleDelete: (id: string) => void;
    handleOpen: (role: Roles) => void;
}

const AdminRoleCard: React.FC<AdminRoleCardProps> = ({ role, handleDelete, handleOpen }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        handleDelete(role.roleId); // Подставьте ваше поле для идентификатора роли
        setShowConfirmationModal(false);
    };

    return (
        <Card style={{ width: '18rem' }} key={role.roleId}>
            <Card.Body>
                <Card.Title>{role.roleId}</Card.Title>
                <Card.Text><strong>Role Name:</strong> {role.name}<br/></Card.Text>
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button variant="primary" onClick={() => handleOpen(role)}>Edit</Button>
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
};

export default AdminRoleCard;
