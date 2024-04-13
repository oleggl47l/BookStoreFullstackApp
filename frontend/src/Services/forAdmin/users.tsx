import axios from 'axios';

export interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    roleId?: string;
}

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.get("http://localhost:5282/api/UserCRUD");
        return response.data;
    } catch (error) {
        console.error('Ошибка получения списка пользователей:', error);
        throw error;
    }
};

export const createUser = async (userRequest: UserRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.post("http://localhost:5282/api/UserCRUD", userRequest);
    } catch (error) {
        console.error('Ошибка создания пользователя:', error);
        throw error;
    }
};

export const updateUser = async (id: string, userRequest: UserRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.put(`http://localhost:5282/api/UserCRUD/${id}`, userRequest);
    } catch (error) {
        console.error('Ошибка обновления пользователя:', error);
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.delete(`http://localhost:5282/api/UserCRUD/${id}`);
    } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
        throw error;
    }
};

export const getUserById = async (userId: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    try {
        const response = await axios.get(`http://localhost:5282/api/UserCRUD/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};
