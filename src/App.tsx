import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Register from "./pages/Register/Register";
import './App.css';
import {authContext, AuthProvider} from "./context/auth/authContext";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile/Profile";
import CollectionPage from "./pages/Collection/CollectionPage";
import ItemPage from "./pages/Item/ItemPage";
import AdminPage from "./pages/Admin/AdminPage";
import Search from "./pages/Search/Search";
import {ThemeProvider} from "./context/theme/themeContext";
const queryClient = new QueryClient()

function App() {
    useLayoutEffect(() => {
    }, [])
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/" element={<AnonymousPage layout={Layout} component={Home}/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/register" element={<Register/>}></Route>
                            <Route path="/profile/:userId" element={<AnonymousPage component={Profile} layout={Layout}/>}></Route>
                            <Route path="/collection/:id" element={<AnonymousPage component={CollectionPage} layout={Layout}/>}></Route>
                            <Route path="/item/:id" element={<AnonymousPage component={ItemPage} layout={Layout}/>}></Route>
                            <Route path="/search/" element={<AnonymousPage component={Search} layout={Layout}/>}></Route>
                            <Route path="/admin" element={<PrivatePage component={AdminPage} layout={Layout}/>}></Route>
                            <Route path="*" element={<AnonymousPage layout={Layout} component={NotFound}/>}></Route>
                        </Routes>
                </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}


const LayoutDefault = ({children}: any) => children

function PrivatePage({layout: PageLayout = LayoutDefault, component: Comp}: any) {
    const {user, onLogOut, onToken} = useContext(authContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user?.adminrole) navigate('/login')
    }, [])
    return user ? <PageLayout onLogOut={onLogOut} onToken={onToken} user={user}><Comp/></PageLayout> : null
}

function AnonymousPage({layout: PageLayout = LayoutDefault, component: Comp}: any) {
    const {user, onLogOut} = useContext(authContext)
    return <PageLayout  onLogOut={onLogOut} user={user}><Comp/></PageLayout>
}

export default App;
