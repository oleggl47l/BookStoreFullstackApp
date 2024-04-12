import axios from 'axios';

export interface OrderItemRequest {
    orderId: string;
    bookId: string;
    quantity: number;
    price: number
}

export const getAllOrderItems = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.get("http://localhost:5282/api/OrderItemCRUD");
        return response.data;
    } catch (error) {
        console.error('Ошибка получения списка элементов заказа:', error);
        throw error;
    }
};

export const createOrderItem = async (orderItemRequest: OrderItemRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.post("http://localhost:5282/api/OrderItemCRUD", orderItemRequest);
    } catch (error) {
        console.error('Ошибка создания элемента заказа:', error);
        throw error;
    }
};

export const updateOrderItem = async (id: string, orderItemRequest: OrderItemRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.put(`http://localhost:5282/api/OrderItemCRUD/${id}`, orderItemRequest);
    } catch (error) {
        console.error('Ошибка обновления элемента заказа:', error);
        throw error;
    }
};

export const deleteOrderItem = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.delete(`http://localhost:5282/api/OrderItemCRUD/${id}`);
    } catch (error) {
        console.error('Ошибка удаления элемента заказа:', error);
        throw error;
    }
};
