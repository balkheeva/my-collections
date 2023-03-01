import {Button, Container, Form, InputGroup, Navbar, Dropdown, Row, Col, NavDropdown} from "react-bootstrap";
import './NavigationBar.scss'
import {NavLink} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import {User} from "../../context/auth/authContext";
import SearchDropDown from "../../components/SearchDropDown/SearchDropDown";
import {useState} from "react";

type Props = {
    user?: User,
    onLogOut?: () => void,
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSearchSubmit: (query: string) => void,
    searchValue: string,
    foundData: any
}

export default function NavigationBar(props: Props) {
    const {user, onLogOut, searchValue, onSearchChange, foundData, onSearchSubmit} = props
    const [showDropDown, setShowDropDown] = useState(false)

    const handleSubmitSearch = (value: string) => {
        setShowDropDown(false)
        onSearchSubmit(value)
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowDropDown(true)
        onSearchChange(e)
    }
    return (
        <Navbar className="shadow-sm bg-white " collapseOnSelect expand="md">
            <Container>
                <Row className="align-items-center w-100 justify-content-between">
                    <Col lg={3} className="d-none d-lg-block">
                        <Navbar.Brand className="fw-bold">
                            <NavLink className="text-decoration-none" to="/">My Collections</NavLink>
                        </Navbar.Brand>
                    </Col>
                    <Col lg={4} md={8} xs={8}>
                        <Navbar.Text>
                            <div className="position-relative w-100">
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Search"
                                        onChange={handleChangeSearch}
                                        onBlur={() => setShowDropDown(false)}
                                        value={searchValue}>
                                    </Form.Control>
                                    <Button onClick={() => handleSubmitSearch(searchValue)}>Search</Button>
                                </InputGroup>
                                {showDropDown && <SearchDropDown onClick={() => setShowDropDown(false)} foundData={foundData}/>}
                            </div>
                        </Navbar.Text>
                    </Col>
                    <Col lg={3} sm={3} xs={2}>
                        {user && onLogOut ? <ProfileInfo onLogOut={onLogOut} user={user}/> :
                            <NavLink to="/login" className="d-block ms-auto">Sign in</NavLink>}
                    </Col>
                    <Col className="p-0" xs={1}>
                        <Dropdown className="d-flex justify-content-end">
                            <Dropdown.Toggle variant="link" className="p-0" id="dropdown-basic">
                                EN
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">EN</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">RU</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}
