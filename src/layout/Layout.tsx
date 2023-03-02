import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { search } from '../api/search';
import { User } from '../context/auth/authContext';
import NavigationBar from './NavigationBar/NavigationBar';

export default function Layout(props: {
  children: ReactNode;
  user?: User;
  onLogOut?: () => void;
}) {
  const { children, user, onLogOut } = props;
  const [searchValue, setSearchValue] = useState(
    new URLSearchParams(window.location.search).get('query') || '',
  );
  const [foundData, setFoundData] = useState([]);
  const navigate = useNavigate();

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const handleSubmitSearch = (query: string) => {
    navigate(`/search/?query=${query}`);
  };

  useEffect(() => {
    search(searchValue).then((data: any) => {
      setFoundData(data);
    });
  }, [searchValue]);

  return (
    <div>
      <NavigationBar
        user={user}
        onLogOut={onLogOut}
        onSearchChange={handleChangeSearch}
        onSearchSubmit={handleSubmitSearch}
        searchValue={searchValue}
        foundData={foundData}
      />
      <Container className="mt-5 mb-5 ">{children}</Container>
    </div>
  );
}
