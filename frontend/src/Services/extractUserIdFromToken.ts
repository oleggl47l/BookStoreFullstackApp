export const extractUserIdFromToken = (token: string) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } catch (error) {
        console.error('Ошибка при извлечении роли из токена:', error);
        return null;
    }
};