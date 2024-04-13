import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import {extractRoleFromToken} from "../../Services/extractRoleFromToken.ts";

export const NavBar = () => {
    const [role, setRole] = useState('');
    const isAuthenticated = localStorage.getItem('token') !== null;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const extractedRole = extractRoleFromToken(token);
            setRole(extractedRole);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#003049' }} variant="dark">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/store">Store</Nav.Link>
                        {isAuthenticated && role === 'Admin' && (
                            <NavDropdown title="Admin" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/booksPage">Books</NavDropdown.Item>
                                <NavDropdown.Item href="/usersPage">Users</NavDropdown.Item>
                                <NavDropdown.Item href="/rolesPage">Roles</NavDropdown.Item>
                                <NavDropdown.Item href="/ordersPage">Orders</NavDropdown.Item>
                                <NavDropdown.Item href="/orderItemsPage">OrderItems</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav className="me-xxl-1 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/registration">Registration</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
