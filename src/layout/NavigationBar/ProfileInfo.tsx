import { useContext } from 'react';
import { Button, NavDropdown, Stack } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import DarkThemeIcon from '../../components/icons/DarkThemeIcon';
import ImpersonateIcon from '../../components/icons/ImpersonateIcon';
import LogoutIcon from '../../components/icons/LogoutIcon';
import UserIcon from '../../components/icons/UserIcon';
import UsersIcon from '../../components/icons/UsersIcon';
import { User } from '../../context/auth/authContext';
import { themeContext } from '../../context/theme/themeContext';

export default function ProfileInfo(props: {
  user: User;
  onLogOut: () => void;
}) {
  const { user, onLogOut } = props;
  const { theme, onToggleTheme } = useContext(themeContext);
  const handleDeimpersonate = () => {
    const adminToken = localStorage.getItem('adminToken') || '';
    localStorage.setItem('token', adminToken);
    localStorage.removeItem('adminToken');
    window.location.reload();
  };
  return (
    <NavDropdown title={props.user.name}>
      <NavDropdown.Item
        href={`/profile/${user.id}`}
        className="text-decoration-none"
      >
        <FormattedMessage id="app.nav.dropdown.item1" />
      </NavDropdown.Item>
      <NavDropdown.Item
        as="button"
        onClick={() => onToggleTheme(theme ? '' : 'dark')}
      >
        <DarkThemeIcon /> <FormattedMessage id="app.nav.dropdown.item2" />
      </NavDropdown.Item>
      {user.impersonatedBy && (
        <NavDropdown.Item as="button" onClick={handleDeimpersonate}>
          <ImpersonateIcon /> <FormattedMessage id="app.nav.dropdown.item3" />
        </NavDropdown.Item>
      )}
      {user.adminrole && (
        <NavDropdown.Item href="/admin">
          <UsersIcon /> <FormattedMessage id="app.nav.dropdown.item4" />
        </NavDropdown.Item>
      )}
      <NavDropdown.Divider />
      <NavDropdown.Item as="button" onClick={onLogOut} title="Log out">
        <LogoutIcon /> <FormattedMessage id="app.nav.dropdown.item5" />
      </NavDropdown.Item>
    </NavDropdown>
  );
}
