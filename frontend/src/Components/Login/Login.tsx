import React, { useState } from 'react';
import axios from 'axios';
import {Button, Card, Container, Form} from "react-bootstrap";
import {extractRoleFromToken} from "../../Services/extractRoleFromToken.ts";
import {extractUserIdFromToken} from "../../Services/extractUserIdFromToken.ts";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
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
            const response = await axios.post('http://localhost:5282/api/auth/login', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            const role = extractRoleFromToken(token);
            const userId = extractUserIdFromToken(token); // Получаем идентификатор пользователя из токена
            console.log('Полученная роль:', role); // Выводим роль в консоль
            console.log('Id пользователя:', userId); // Выводим роль в консоль
            // Переход на другую страницу после успешной авторизации
            window.location.href = "/"
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <Container className="container">
            <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', padding: '20px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;
