import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RoleRequest} from "../../Services/forAdmin/roles.tsx";

interface CreateUpdateRoleProps {
    mode: Mode;
    values: Roles;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: RoleRequest) => void;
    handleUpdate: (id: string, request: RoleRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

const CreateUpdateRole: React.FC<CreateUpdateRoleProps> = ({
                                                               mode,
                                                               values,
                                                               isModalOpen,
                                                               handleCancel,
                                                               handleCreate,
                                                               handleUpdate,
                                                           }) => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        setName(values.name)
    }, [values]);

    const handleOnOk = async () => {
        const roleRequest = { name };
        mode == Mode.Create
            ? handleCreate(roleRequest)
            : handleUpdate(values.roleId, roleRequest)
    };

    return (
        <Modal show={isModalOpen} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === Mode.Create ? 'Add Role' : 'Edit Role'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleOnOk}>
                    {mode === Mode.Create ? 'Add' : 'Save'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUpdateRole;
