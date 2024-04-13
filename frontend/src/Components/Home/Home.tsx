import {useEffect, useState} from "react";
import {extractRoleFromToken} from "../../Services/extractRoleFromToken.ts";

export const Home = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const role = extractRoleFromToken(token);
            setRole(role);
        }
    }, []);

    return (
        <div className={"text-light"}>
            {role === 'Admin' && (
                <div>
                    <h1>Welcome, Admin!</h1>
                    <p>This is the admin dashboard.</p>
                </div>
            )}
            {role === 'User' && (
                <div>
                    <h1>Welcome, User!</h1>
                    <p>This is the user dashboard.</p>
                </div>
            )}
            {role === '' && (
                <div>
                    <h1>Welcome!</h1>
                    <p>Please log in to see your dashboard.</p>
                </div>
            )}
        </div>
    );
};