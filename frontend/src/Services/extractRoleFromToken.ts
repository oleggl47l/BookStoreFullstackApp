export const extractRoleFromToken = (token: string) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
        console.error('Ошибка при извлечении роли из токена:', error);
        return null;
    }
};