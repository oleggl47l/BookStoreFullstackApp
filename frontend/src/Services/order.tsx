import axios from 'axios';


export const addToCart = async (userId: string, bookId: string, quantity: number) => {
    try {
        const response = await axios.post(`http://localhost:5282/api/order/${userId}/addItem`, {bookId, quantity});
        return response.data;
    } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        throw error;
    }
};

export const removeFromCart = async (orderItemId: string) => {
    try {
        const response = await axios.delete(`http://localhost:5282/api/order/${orderItemId}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка удаления из корзины:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (orderItemId: string, newQuantity: number) => {
    try {
        const response = await axios.put(`http://localhost:5282/api/order/${orderItemId}`, {newQuantity});
        return response.data;
    } catch (error) {
        console.error('Ошибка обновления количества товара в корзине:', error);
        throw error;
    }
};
