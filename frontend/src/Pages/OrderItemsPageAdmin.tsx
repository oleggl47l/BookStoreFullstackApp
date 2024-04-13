import { UpdateOrderItem, Mode } from '../Components/OrderItemCardAdmin/UpdateOrderItem.tsx';
import { useEffect, useState } from 'react';
import { OrderItemRequest, deleteOrderItem, getAllOrderItems, updateOrderItem } from '../Services/forAdmin/orderItems.tsx';
import {AdminOrderItemCard} from "../Components/OrderItemCardAdmin/OrderItemCardAdmin.tsx";

export default function OrderItemsPage() {
    const defaultValues = {
        orderId: '',
        bookId: '',
        quantity: 0,
        price: 0,
    } as OrderItems;

    const [values, setValues] = useState<OrderItems>(defaultValues);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Edit);

    useEffect(() => {
        const getOrderItems = async () => {
            const orderItems = await getAllOrderItems();
            setLoading(false);
            setOrderItems(orderItems);
        };

        getOrderItems();
    }, []);

    const handleUpdateOrderItem = async (id: string, request: OrderItemRequest) => {
        await updateOrderItem(id, request);
        closeModal();
        const orderItems = await getAllOrderItems();
        setOrderItems(orderItems);
    };

    const handleDeleteOrderItem = async (id: string) => {
        await deleteOrderItem(id);
        closeModal();
        const orderItems = await getAllOrderItems();
        setOrderItems(orderItems);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (orderItem: OrderItems) => {
        setMode(Mode.Edit);
        setValues(orderItem);
        setIsModalOpen(true);
    };

    return (
        <div style={{ margin: '10px' }}>
            <UpdateOrderItem
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCancel={closeModal}
                handleUpdate={handleUpdateOrderItem}
            />

            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {orderItems.map((orderItem: OrderItems) => (
                        <div key={orderItem.orderItemId}>
                            <AdminOrderItemCard
                                orderItem={orderItem}
                                handleDelete={handleDeleteOrderItem}
                                handleOpen={openEditModal}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
