import React, { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
            const response = await axios.post('http://localhost:5282/api/Registration/registration', formData);
            const token = response.data.token; // Предполагается, что сервер возвращает токен
            localStorage.setItem('token', token);
            // Переход на другую страницу после успешной регистрации
            navigate('/login');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке пользователю
        }
    };

    return (
        <Container className="container">
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </Form.Group>
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
    );
};

export default Registration;
