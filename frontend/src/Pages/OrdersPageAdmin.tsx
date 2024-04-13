import {UpdateOrder, Mode} from '../Components/OrderCardAdmin/UpdateOrder.tsx';
import {useEffect, useState} from 'react';
import {OrderRequest, deleteOrder, getAllOrders, updateOrder} from '../Services/forAdmin/orders.tsx';
import {AdminOrderCard} from "../Components/OrderCardAdmin/OrderCardAdmin.tsx";

export default function OrdersPageAdmin() {
    const defaultValues = {
        orderDate: new Date(),
        totalAmount: 0,
        userId: '',
    } as Orders;

    const [values, setValues] = useState<Orders>(defaultValues);
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Edit);

    useEffect(() => {
        const getOrders = async () => {
            const orders = await getAllOrders();
            setLoading(false);
            setOrders(orders);
        };

        getOrders();
    }, []);

    const handleUpdateOrder = async (id: string, request: OrderRequest) => {
        await updateOrder(id, request);
        closeModal();
        const orders = await getAllOrders();
        setOrders(orders);
    };

    const handleDeleteOrder = async (id: string) => {
        await deleteOrder(id);
        closeModal();
        const orders = await getAllOrders();
        setOrders(orders);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (order: Orders) => {
        setMode(Mode.Edit);
        setValues(order);
        setIsModalOpen(true);
    };

    return (
        <div style={{margin: '10px'}}>
            <UpdateOrder
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleUpdate={handleUpdateOrder}
            />

            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center'}}>
                    {orders.map((order: Orders) => (
                        <div key={order.orderId}>
                            <AdminOrderCard
                                order={order}
                                handleDelete={handleDeleteOrder}
                                handleOpen={openEditModal}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
