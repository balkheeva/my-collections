import { NavDropdown, Stack } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import ImpersonateIcon from '../../components/icons/ImpersonateIcon';
import LogoutIcon from '../../components/icons/LogoutIcon';
import UserIcon from '../../components/icons/UserIcon';
import UsersIcon from '../../components/icons/UsersIcon';
import { User } from '../../context/auth/authContext';

export default function ProfileInfo(props: {
  user: User;
  onLogOut: () => void;
}) {
  const { user, onLogOut } = props;

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
        <UserIcon /> <FormattedMessage id="app.nav.dropdown.item1" />
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
