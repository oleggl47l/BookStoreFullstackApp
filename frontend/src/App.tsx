import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./Components/Navbar/NavBar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksPageAdmin from "./Pages/BooksPageAdmin.tsx";
import UsersPageAdmin from "./Pages/UsersPageAdmin.tsx";
import RolesPageAdmin from "./Pages/RolesPageAdmin.tsx";
import OrdersPageAdmin from "./Pages/OrdersPageAdmin.tsx";
import OrderItemsPageAdmin from "./Pages/OrderItemsPageAdmin.tsx";
import Registration from "./Components/Registration/Registration.tsx";
import Login from "./Components/Login/Login.tsx";
import { Home } from "./Components/Home/Home.tsx";
import { BooksPage } from "./Pages/BooksPage.tsx";
import UserProfilePage from "./Pages/UserProfilePage.tsx";

function App() {


    return (
        <>
            <div>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path={"/"} element={<Home/>}></Route>
                        <Route path={"/store"} element={<BooksPage/>}></Route>
                        <Route path={"/booksPage"} element={<BooksPageAdmin/>}></Route>
                        <Route path={"/usersPage"} element={<UsersPageAdmin/>}></Route>
                        <Route path={"/rolesPage"} element={<RolesPageAdmin/>}></Route>
                        <Route path={"/ordersPage"} element={<OrdersPageAdmin/>}></Route>
                        <Route path={"/orderItemsPage"} element={<OrderItemsPageAdmin/>}></Route>
                        <Route path={"/registration"} element={<Registration/>}></Route>
                        <Route path={"/login"} element={<Login/>}></Route>
                        <Route path={"/profile"} element={<UserProfilePage/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App;
