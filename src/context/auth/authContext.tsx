import { Context, ReactNode, createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type User = {
  impersonatedBy?: string;
  id: string;
  name: string;
  email: string;
  adminrole: boolean;
};

const authContext: Context<{
  user: User | null;
  onToken: (token: string) => void;
  onLogOut: () => void;
}> = createContext<any>(null) as any;

export { authContext };

export function AuthProvider(props: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    return token ? extractUser(token) : null;
  });
  const value = useMemo(
    () => ({
      user,
      onToken: (token: string) => setUser(extractUser(token)),
      onLogOut: () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
      },
    }),
    [user],
  );
  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}

function extractUser(jwtToken: string) {
  const parsed = jwtToken.split('.')[1];
  return JSON.parse(atob(parsed));
}
