import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5282/api/Registration/registration', formData);
            const token = response.data.token; // Предполагается, что сервер возвращает токен
            localStorage.setItem('token', token);
            // Переход на другую страницу после успешной регистрации
            navigate('/dashboard'); // Замените '/dashboard' на ваш маршрут
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <div className="container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Имя</label>
                    <input type="text" className="form-control" id="firstName" name="firstName"
                           value={formData.firstName} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Фамилия</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password" name="password"
                           value={formData.password} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
