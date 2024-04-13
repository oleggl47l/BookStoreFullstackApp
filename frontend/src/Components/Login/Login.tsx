import React, { useState } from 'react';
import axios from 'axios';
import {Button, Card, Container, Form} from "react-bootstrap";
import {extractRoleFromToken} from "../../Services/extractRoleFromToken.ts";

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
            console.log('Полученная роль:', role); // Выводим роль в консоль
            // Переход на другую страницу после успешной авторизации
            window.location.href = "/"
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <Container className="container">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;
