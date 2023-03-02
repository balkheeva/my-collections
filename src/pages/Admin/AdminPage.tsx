import { useContext, useEffect } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import {
  blockUser,
  deleteUser,
  impersonate,
  loadUsers,
  makeAdmin,
  unblockUser,
} from '../../api/users';
import BlockIcon from '../../components/icons/BlockIcon';
import ChangeIcon from '../../components/icons/ChangeIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import ImpersonateIcon from '../../components/icons/ImpersonateIcon';
import SettingsIcon from '../../components/icons/SettingsIcon';
import { authContext } from '../../context/auth/authContext';
import { formatDate } from '../../infrastructure/helpers/formatDate';

export default function AdminPage() {
  const { user, onToken } = useContext(authContext);
  const navigate = useNavigate();
  const usersMutationsLoad = useMutation(loadUsers);
  const usersMutationsBlock = useMutation(blockUser, {
    onSuccess: () => {
      usersMutationsLoad.mutate();
    },
  });
  const usersMutationsUnblock = useMutation(unblockUser, {
    onSuccess: () => {
      usersMutationsLoad.mutate();
    },
  });
  const usersMutationsChangeRole = useMutation(makeAdmin, {
    onSuccess: () => {
      usersMutationsLoad.mutate();
    },
  });
  const usersMutationsDelete = useMutation(deleteUser, {
    onSuccess: () => {
      usersMutationsLoad.mutate();
    },
  });
  const usersMutationsImpersonate = useMutation(impersonate, {
    onSuccess: ({ token }) => {
      const adminToken = localStorage.getItem('token') || '';
      localStorage.setItem('adminToken', adminToken);
      onToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    },
  });
  const currentUser = user;
  const users = usersMutationsLoad.data || [];
  const intl = useIntl();

  useEffect(() => {
    usersMutationsLoad.mutate();
  }, []);

  const handleBlockOrUnblockUser = (user: any) => {
    if (user.status === 'active') usersMutationsBlock.mutate(user.id);
    else usersMutationsUnblock.mutate(user.id);
    usersMutationsBlock.reset();
    usersMutationsUnblock.reset();
  };
  const handleChangeRole = (data: any) => {
    usersMutationsChangeRole.mutate(data);
    usersMutationsChangeRole.reset();
  };

  const handleDeleteUser = (id: string) => {
    usersMutationsDelete.mutate(id);
    usersMutationsDelete.reset();
  };

  const handleImpersonateUser = (data: any) => {
    usersMutationsImpersonate.mutate(data);
    usersMutationsImpersonate.reset();
  };

  return (
    <Container className="rounded-3 shadow-sm p-3 mt-3 bg-light">
      <Table responsive className="p-3">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="app.admin.table.th1" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th2" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th3" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th4" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th5" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th6" />
            </th>
            <th>
              <FormattedMessage id="app.admin.table.th7" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>{formatDate(user.updatedAt)}</td>
              <td>{user.adminrole ? 'Admin' : 'User'}</td>
              <td>
                {user.id !== currentUser?.id && (
                  <Dropdown className="position-relative">
                    <Dropdown.Toggle variant="link" className="p-0">
                      <SettingsIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="position-fixed">
                      <Dropdown.Item
                        as="button"
                        disabled={Boolean(currentUser?.impersonatedBy)}
                        onClick={() => handleImpersonateUser(user)}
                      >
                        <ImpersonateIcon />{' '}
                        <FormattedMessage id="app.admin.page.btn1" />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleBlockOrUnblockUser(user)}
                      >
                        <BlockIcon />{' '}
                        {user.status === 'active'
                          ? intl.formatMessage({ id: 'app.admin.page.btn2' })
                          : intl.formatMessage({ id: 'app.admin.page.btn3' })}
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleChangeRole(user)}
                      >
                        <ChangeIcon />{' '}
                        <FormattedMessage id="app.admin.page.btn4" />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon />{' '}
                        <FormattedMessage id="app.admin.page.btn5" />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
