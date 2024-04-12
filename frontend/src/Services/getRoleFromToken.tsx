import jwt_decode from 'jwt-decode';

// Функция для получения информации о роли пользователя из токена JWT
const getRoleFromToken = () => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');

    // Если токен отсутствует, возвращаем null
    if (!token) return null;

    try {
        // Декодируем токен

        const decodedToken = jwt_decode(token);

        // Получаем роль пользователя из декодированного токена
        const role = decodedToken.role;

        // Возвращаем роль пользователя
        return role;
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
    }
};

export default getRoleFromToken;
