import { useContext, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import SearchDropDown from '../../components/SearchDropDown/SearchDropDown';
import DarkThemeIcon from '../../components/icons/DarkThemeIcon';
import { User } from '../../context/auth/authContext';
import { localizationContext } from '../../context/localization/localizationContext';
import { themeContext } from '../../context/theme/themeContext';
import './NavigationBar.scss';
import ProfileInfo from './ProfileInfo';

type Props = {
  user?: User;
  onLogOut?: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (query: string) => void;
  searchValue: string;
  foundData: any;
};

export default function NavigationBar(props: Props) {
  const {
    user,
    onLogOut,
    searchValue,
    onSearchChange,
    foundData,
    onSearchSubmit,
  } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  const { currentLocale, onSwitchLocale } = useContext(localizationContext);
  const intl = useIntl();
  const darkModeText = intl.formatMessage({ id: 'app.theme.dark' });
  const lightModeText = intl.formatMessage({ id: 'app.theme.light' });
  const { theme, onToggleTheme } = useContext(themeContext);

  const handleSubmitSearch = (value: string) => {
    setShowDropDown(false);
    onSearchSubmit(value);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDropDown(true);
    onSearchChange(e);
  };
  return (
    // <Navbar className="shadow-sm bg-white " collapseOnSelect expand="md">
    //   <Container>
    //     <Row className="align-items-center w-100 justify-content-between">
    //       <Col lg={3} className="d-none d-lg-block">
    //         <Navbar.Brand className="fw-bold">
    //           <NavLink className="text-decoration-none" to="/">
    //             <FormattedMessage id="app.nav.logo" />
    //           </NavLink>
    //         </Navbar.Brand>
    //       </Col>
    //       <Col lg={4} md={8} xs={8}>
    //         <Navbar.Text>
    //           <div className="position-relative w-100">
    //             <InputGroup>
    //               <Form.Control
    //                 placeholder={intl.formatMessage({
    //                   id: 'app.nav.input.placeholder',
    //                 })}
    //                 onChange={handleChangeSearch}
    //                 onBlur={() => setShowDropDown(false)}
    //                 value={searchValue}
    //               ></Form.Control>
    //               <Button onClick={() => handleSubmitSearch(searchValue)}>
    //                 {intl.formatMessage({ id: 'app.nav.input.btn' })}
    //               </Button>
    //             </InputGroup>
    //             {showDropDown && (
    //               <SearchDropDown
    //                 onClick={() => setShowDropDown(false)}
    //                 foundData={foundData}
    //               />
    //             )}
    //           </div>
    //         </Navbar.Text>
    //       </Col>
    //       <Col lg={3} sm={3} xs={2}>
    //         {user && onLogOut ? (
    //           <ProfileInfo onLogOut={onLogOut} user={user} />
    //         ) : (
    //           <NavLink to="/login" className="d-block ms-auto">
    //             Sign in
    //           </NavLink>
    //         )}
    //       </Col>
    //       <Col className="p-0" xs={1}>
    //         <Dropdown className="d-flex justify-content-end">
    //           <Dropdown.Toggle
    //             variant="link"
    //             className="p-0"
    //             id="dropdown-basic"
    //           >
    //             {currentLocale}
    //           </Dropdown.Toggle>
    //
    //           <Dropdown.Menu>
    //             <Dropdown.Item
    //               href="#/action-1"
    //               onClick={() => onSwitchLocale('en')}
    //             >
    //               EN
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               href="#/action-2"
    //               onClick={() => onSwitchLocale('ru')}
    //             >
    //               RU
    //             </Dropdown.Item>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Navbar>
    <Navbar className="shadow-sm bg-white" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">My collections</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {user && onLogOut ? (
              <ProfileInfo onLogOut={onLogOut} user={user} />
            ) : (
              <Nav.Link href="/login">
                <FormattedMessage id="app.login.input.btn" />
              </Nav.Link>
            )}
            <Nav.Link onClick={() => onToggleTheme(theme ? '' : 'dark')}>
              <DarkThemeIcon /> {theme ? darkModeText : lightModeText}
            </Nav.Link>
            <NavDropdown title={currentLocale} id="navbarScrollingDropdown">
              <NavDropdown.Item
                as="button"
                onClick={() => onSwitchLocale('en')}
              >
                EN
              </NavDropdown.Item>
              <NavDropdown.Item
                as="button"
                onClick={() => onSwitchLocale('ru')}
              >
                RU
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="position-relative">
            <Form className="d-flex">
              <Form.Control
                type="search"
                className="me-2"
                aria-label="Search"
                placeholder={intl.formatMessage({
                  id: 'app.nav.input.placeholder',
                })}
                onChange={handleChangeSearch}
                onBlur={() => setShowDropDown(false)}
                value={searchValue}
              />
              <Button
                variant="outline-success"
                onClick={() => handleSubmitSearch(searchValue)}
              >
                {intl.formatMessage({ id: 'app.nav.input.btn' })}
              </Button>
            </Form>
            {showDropDown && (
              <SearchDropDown
                onClick={() => setShowDropDown(false)}
                foundData={foundData}
              />
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
