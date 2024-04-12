import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const NavBar = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        // Удаление токена из локального хранилища
        localStorage.removeItem('token');
        // Перенаправление на страницу входа
        window.location.href = '/login';
    };

    return (
        <Navbar expand="lg" style={{backgroundColor: '#003049'}} variant="dark">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/smthng">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/booksPage">Books</NavDropdown.Item>
                            <NavDropdown.Item href="/usersPage">Users</NavDropdown.Item>
                            <NavDropdown.Item href="/rolesPage">Roles</NavDropdown.Item>
                            <NavDropdown.Item href="/ordersPage">Orders</NavDropdown.Item>
                            <NavDropdown.Item href="/orderItemsPage">OrderItems</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex m-md-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        className="me-xxl-1 my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {isAuthenticated ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
