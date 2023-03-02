import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import React, { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import { AuthProvider, authContext } from './context/auth/authContext';
import { LocaleProvider } from './context/localization/localizationContext';
import { ThemeProvider } from './context/theme/themeContext';
import Layout from './layout/Layout';
import AdminPage from './pages/Admin/AdminPage';
import CollectionPage from './pages/Collection/CollectionPage';
import ItemPage from './pages/Item/ItemPage';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={<AnonymousPage layout={Layout} component={Home} />}
                ></Route>
                <Route
                  path="/login"
                  element={<AnonymousPage layout={Layout} component={Login} />}
                ></Route>
                <Route
                  path="/register"
                  element={
                    <AnonymousPage layout={Layout} component={Register} />
                  }
                ></Route>
                <Route
                  path="/profile/:userId"
                  element={
                    <AnonymousPage component={Profile} layout={Layout} />
                  }
                ></Route>
                <Route
                  path="/collection/:id"
                  element={
                    <AnonymousPage component={CollectionPage} layout={Layout} />
                  }
                ></Route>
                <Route
                  path="/item/:id"
                  element={
                    <AnonymousPage component={ItemPage} layout={Layout} />
                  }
                ></Route>
                <Route
                  path="/search/"
                  element={<AnonymousPage component={Search} layout={Layout} />}
                ></Route>
                <Route
                  path="/admin"
                  element={
                    <PrivatePage component={AdminPage} layout={Layout} />
                  }
                ></Route>
                <Route
                  path="*"
                  element={
                    <AnonymousPage layout={Layout} component={NotFound} />
                  }
                ></Route>
              </Routes>
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const LayoutDefault = ({ children }: any) => children;

function PrivatePage(props: any) {
  const { layout: PageLayout = LayoutDefault, component: Comp } = props;
  const { user, onLogOut, onToken } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.adminrole) navigate('/login');
  }, []);
  return user ? (
    <PageLayout onLogOut={onLogOut} onToken={onToken} user={user}>
      <Comp />
    </PageLayout>
  ) : null;
}

function AnonymousPage(props: any) {
  const { layout: PageLayout = LayoutDefault, component: Comp } = props;
  const { user, onLogOut } = useContext(authContext);
  return (
    <PageLayout onLogOut={onLogOut} user={user}>
      <Comp />
    </PageLayout>
  );
}

export default App;
