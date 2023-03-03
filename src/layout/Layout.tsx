import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { User } from '../context/auth/authContext';
import NavigationBar from './NavigationBar/NavigationBar';

export default function Layout(props: {
  children: ReactNode;
  user?: User;
  onLogOut?: () => void;
}) {
  const { children, user, onLogOut } = props;

  return (
    <div>
      <NavigationBar user={user} onLogOut={onLogOut} />
      <Container className="mt-5 mb-5 ">{children}</Container>
    </div>
  );
}
