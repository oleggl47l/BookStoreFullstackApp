import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate вместо useHistory
import axios from 'axios';

const LoginForm: React.FC = () => {
    const navigate = useNavigate(); // Хук для управления навигацией
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5282/api/auth/login', formData);
            const token = response.data.token; // Предполагается, что сервер возвращает токен
            localStorage.setItem('token', token);
            // Переход на другую страницу после успешной авторизации
            navigate('/user-list'); // Редирект на страницу со списком пользователей
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <div className="container">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>
            </form>
        </div>
    );
};

export default LoginForm;
