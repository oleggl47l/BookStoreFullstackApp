import axios from 'axios';

export interface OrderRequest {
    orderDate: Date;
    totalAmount: number;
    userId: string;
}

export const getAllOrders = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.get("http://localhost:5282/api/OrderCRUD");
        return response.data;
    } catch (error) {
        console.error('Ошибка получения списка заказов:', error);
        throw error;
    }
};

export const createOrder = async (orderRequest: OrderRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.post("http://localhost:5282/api/OrderCRUD", orderRequest);
    } catch (error) {
        console.error('Ошибка создания заказа:', error);
        throw error;
    }
};

export const updateOrder = async (id: string, orderRequest: OrderRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.put(`http://localhost:5282/api/OrderCRUD/${id}`, orderRequest);
    } catch (error) {
        console.error('Ошибка обновления заказа:', error);
        throw error;
    }
};

export const deleteOrder = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.delete(`http://localhost:5282/api/OrderCRUD/${id}`);
    } catch (error) {
        console.error('Ошибка удаления заказа:', error);
        throw error;
    }
};

export const getOrderById = async (orderId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    try {
        const response = await axios.get(`http://localhost:5282/api/OrderCRUD/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};