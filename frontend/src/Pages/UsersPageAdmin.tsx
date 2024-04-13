import { UpdateUserAdmin, Mode } from "../Components/UserCardAdmin/UpdateUserAdmin.tsx";
import { AdminUserCard } from "../Components/UserCardAdmin/UserCardAdmin.tsx";
import { useEffect, useState } from "react";
import { UserRequest, deleteUser, getAllUsers, updateUser } from "../Services/forAdmin/users.tsx";

export default function UsersPageAdmin() {
    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
    } as User;

    const [values, setValues] = useState<User>(defaultValues);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Edit);

    useEffect(() => {
        const getUsers = async () => {
            const users = await getAllUsers();
            setLoading(false);
            setUsers(users);
        };

        getUsers();
    }, []);


    const handleUpdateUser = async (id: string, request: UserRequest) => { // Изменено на Partial<UserRequest>
        // Обновляем только roleId
        await updateUser(id, request);
        closeModal();
        const users = await getAllUsers();
        setUsers(users);
    };

    const handleDeleteUser = async (id: string) => {
        await deleteUser(id);
        closeModal();
        const users = await getAllUsers();
        setUsers(users);
    };


    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (user: User) => {
        setMode(Mode.Edit);
        setValues(user);
        setIsModalOpen(true);
    };

    return (
        <div style={{ margin: '10px' }}>

            <UpdateUserAdmin
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleUpdate={handleUpdateUser}
            />

            {loading ? (<h1>Loading . . .</h1>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                    {users.map((user: User) => (
                        <div key={user.userId} >
                            <AdminUserCard
                                user={user}
                                handleDelete={handleDeleteUser}
                                handleOpen={openEditModal}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
