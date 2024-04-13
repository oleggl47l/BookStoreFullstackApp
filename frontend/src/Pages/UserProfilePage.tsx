import React, { useState, useEffect } from 'react';
import { extractUserIdFromToken } from '../Services/extractUserIdFromToken.ts';
import { getUserById, updateUser, UserRequest } from '../Services/forAdmin/users.tsx';
import { UserProfileCard } from "../Components/UserProfileCard/UserProfileCard.tsx";
import { Mode, UpdateUser } from "../Components/UserProfileCard/UpdateUser.tsx";
import {getAllOrders} from "../Services/forAdmin/orders.tsx";
import {UserOrderCard} from "../Components/OrderCard/OrderCard.tsx";

const UserProfilePage: React.FC = () => {
    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
    } as User;

    const [values, setValues] = useState<User>(defaultValues);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mode, setMode] = useState(Mode.Edit);
    const [orders, setOrders] = useState<Orders[]>([]); // Состояние для хранения заказов пользователя

    const userId: string = extractUserIdFromToken(localStorage.getItem('token') || '');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData: User = await getUserById(userId);
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();

        // Получаем все заказы пользователя после загрузки страницы
        const fetchOrders = async () => {
            try {
                const userOrders = await getAllOrders();
                // Фильтруем заказы по userId
                const filteredOrders = userOrders.filter((order: Orders) => order.userId === userId);
                setOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (user: User) => {
        setMode(Mode.Edit);
        setValues(user);
        setIsModalOpen(true);
    };

    const handleUpdateUser = async (id: string, request: UserRequest) => {
        await updateUser(id, request);
        closeModal();
        const updatedUser = await getUserById(userId);
        setUser(updatedUser);
    };

    return (
        <div style={{margin: '10px', display: 'flex', justifyContent: 'center'}}>

            <UpdateUser
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleUpdate={handleUpdateUser}
            />

            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 className={"text-light"}>User Profile</h1>
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center"}}>

                        <UserProfileCard user={user!} handleOpen={openEditModal}/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 className={"text-light"}>User orders</h1>
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center"}}>
                        {orders.map(order => (
                            <UserOrderCard key={order.orderId} order={order}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;
