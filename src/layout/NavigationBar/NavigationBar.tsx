import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { search } from '../../api/search';
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
};

export default function NavigationBar(props: Props) {
  const { user, onLogOut } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  const { currentLocale, onSwitchLocale } = useContext(localizationContext);
  const [foundData, setFoundData] = useState([]);
  const intl = useIntl();
  const darkModeText = intl.formatMessage({ id: 'app.theme.dark' });
  const lightModeText = intl.formatMessage({ id: 'app.theme.light' });
  const { theme, onToggleTheme } = useContext(themeContext);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(
    new URLSearchParams(window.location.search).get('query') || '',
  );

  const handleSubmitSearch = (query: string) => {
    setShowDropDown(false);
    navigate(`/search/?query=${query}`);
  };

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowDropDown(true);
      setSearchValue(e.target.value);
    },
    [],
  );

  useEffect(() => {
    search(searchValue).then((data: any) => {
      setFoundData(data);
    });
  }, [searchValue]);

  return (
    <Navbar className="shadow-sm bg-white" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          <strong>My collections</strong>
        </Navbar.Brand>
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
