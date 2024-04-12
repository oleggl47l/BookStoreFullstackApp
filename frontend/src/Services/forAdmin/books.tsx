import axios from 'axios';

export interface BookRequest {
    title: string;
    author: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

export const getAllBooks = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.get("http://localhost:5282/api/BookCRUD");
        return response.data;
    } catch (error) {
        console.error('Ошибка получения списка книг:', error);
        throw error;
    }
};

export const createBook = async (bookRequest: BookRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.post("http://localhost:5282/api/BookCRUD", bookRequest);
    } catch (error) {
        console.error('Ошибка создания книги:', error);
        throw error;
    }
};

export const updateBook = async (id: string, bookRequest: BookRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.put(`http://localhost:5282/api/BookCRUD/${id}`, bookRequest);
    } catch (error) {
        console.error('Ошибка обновления книги:', error);
        throw error;
    }
};

export const deleteBook = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.delete(`http://localhost:5282/api/BookCRUD/${id}`);
    } catch (error) {
        console.error('Ошибка удаления книги:', error);
        throw error;
    }
};
