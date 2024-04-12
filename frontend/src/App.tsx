import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


// import UserList from "./Services/users.tsx";
// import { BrowserRouter as Router } from 'react-router-dom';
//
// import RegistrationForm from "./Services/Reg.tsx";
// import LoginForm from "./Services/Login.tsx";
// import BooksPage from "./Pages/BooksPage.tsx";
import {NavBar} from "./Components/Navbar/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BooksPage from "./Pages/BooksPage.tsx";
import UsersPage from "./Pages/UsersPage.tsx";
import RolesPage from "./Pages/RolesPage.tsx";
import OrdersPage from "./Pages/OrdersPage.tsx";
import OrderItemsPage from "./Pages/OrderItemsPage.tsx";

import Registration from "./Components/Registration/Registration.tsx";
import Login from "./Components/Login/Login.tsx";
import {Home} from "./Components/Home/Home.tsx";

function App() {

    return (
        <>
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}></Route>
                        <Route path={"/booksPage"} element={<BooksPage/>}></Route>
                        <Route path={"/usersPage"} element={<UsersPage/>}></Route>
                        <Route path={"/rolesPage"} element={<RolesPage/>}></Route>
                        <Route path={"/ordersPage"} element={<OrdersPage/>}></Route>
                        <Route path={"/orderItemsPage"} element={<OrderItemsPage/>}></Route>
                        <Route path={"/registration"} element={<Registration/>}></Route>
                        <Route path={"/login"} element={<Login/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
