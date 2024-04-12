import axios from 'axios';

export interface RoleRequest {
    name: string;
}

export const getAllRoles = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.get("http://localhost:5282/api/RoleCRUD");
        return response.data;
    } catch (error) {
        console.error('Ошибка получения списка ролей:', error);
        throw error;
    }
};

export const createRole = async (roleRequest: RoleRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.post("http://localhost:5282/api/RoleCRUD", roleRequest);
    } catch (error) {
        console.error('Ошибка создания роли:', error);
        throw error;
    }
};

export const updateRole = async (id: string, roleRequest: RoleRequest) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.put(`http://localhost:5282/api/RoleCRUD/${id}`, roleRequest);
    } catch (error) {
        console.error('Ошибка обновления роли:', error);
        throw error;
    }
};

export const deleteRole = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    try {
        await axios.delete(`http://localhost:5282/api/RoleCRUD/${id}`);
    } catch (error) {
        console.error('Ошибка удаления роли:', error);
        throw error;
    }
};
