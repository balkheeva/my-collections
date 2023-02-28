import {Button, Container, Form, InputGroup, Navbar} from "react-bootstrap";
import '../NavigationBar/NavigationBar.scss'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {authContext} from "../../auth/authContext";
import ProfileInfo from "./ProfileInfo";
export default function NavigationBar() {
    const {user, onLogout} = useContext(authContext)
    const handleLogOut = () => {
        localStorage.removeItem('token')
        onLogout()
    }
    return (
        <Navbar className="shadow-sm bg-white " collapseOnSelect expand="md">
            <Container>
                <Navbar.Brand className="fw-bold">
                    <NavLink className="text-decoration-none" to="/">My Collections</NavLink>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-center">
                    <InputGroup className="w-auto">
                        <Form.Control
                            placeholder="Search"
                        >
                        </Form.Control>
                        <Button>Search</Button>
                    </InputGroup>
                </Navbar.Collapse>
                {user ? <ProfileInfo onLogOut={handleLogOut} /> : <NavLink to="/login" className="d-block ms-auto">Sign in</NavLink>}
            </Container>
        </Navbar>
    )
}
