import Button from 'react-bootstrap/Button';
import CreateUpdateRole, { Mode } from '../Components/RoleCard/CreateUpdateRole';
import AdminRoleCard from '../Components/RoleCard/RoleCard';
import {  RoleRequest, createRole, deleteRole, getAllRoles, updateRole } from '../Services/forAdmin/roles';
import {useEffect, useState} from "react";

export default function RolesPage() {
    const defaultValues = {
        name: 'Default',
    } as Roles;



    const [values, setValues] = useState<Roles>(defaultValues);
    const [roles, setRoles] = useState<Roles[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);


    useEffect(() => {
        const getRoles = async () => {
            const roles = await getAllRoles();
            setLoading(false);
            setRoles(roles);
        };

        getRoles();
    }, []);

    const handleCreateRole = async (request: RoleRequest) => {
        await createRole(request);
        closeModal();
        const roles = await getAllRoles();
        setRoles(roles);
    };

    const handleUpdateRole = async (id: string, request: RoleRequest) => {
        await updateRole(id, request);
        closeModal();
        const roles = await getAllRoles();
        setRoles(roles);
    };

    const handleDeleteRole = async (id: string) => {
        await deleteRole(id);
        closeModal();
        const roles = await getAllRoles();
        setRoles(roles);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (role: Roles) => {
        setMode(Mode.Edit);
        setValues(role);
        setIsModalOpen(true);
    };

    return (
        <div style={{ margin: '10px' }}>
            <Button variant="primary" style={{ marginBlock: '10px' }} size="lg" onClick={openModal}>
                Add role
            </Button>

            <CreateUpdateRole
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleCreate={handleCreateRole}
                handleUpdate={handleUpdateRole}
            />

            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {roles.map((role: Roles) => (
                        <div key={role.roleId}>
                            <AdminRoleCard role={role} handleDelete={handleDeleteRole} handleOpen={openEditModal} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
