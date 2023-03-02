import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import locales from './constants/locales';
import { AuthProvider, authContext } from './context/auth/authContext';
import {
  LocaleProvider,
  localizationContext,
} from './context/localization/localizationContext';
import { ThemeProvider } from './context/theme/themeContext';
import Layout from './layout/Layout';
import enMessages from './localizations/en.json';
import ruMessages from './localizations/ru.json';
import AdminPage from './pages/Admin/AdminPage';
import CollectionPage from './pages/Collection/CollectionPage';
import ItemPage from './pages/Item/ItemPage';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';

const queryClient = new QueryClient();

const messages = {
  [locales.RU]: ruMessages,
  [locales.EN]: enMessages,
};

function App() {
  const [currentLocale, setCurrentLocale] = useState(
    () => localStorage.getItem('locale') || locales.EN,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <LocaleProvider>
              <IntlProvider
                locale={currentLocale}
                messages={messages[currentLocale]}
              >
                <Routes>
                  <Route
                    path="/"
                    element={<AnonymousPage layout={Layout} component={Home} />}
                  ></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route
                    path="/profile/:userId"
                    element={
                      <AnonymousPage component={Profile} layout={Layout} />
                    }
                  ></Route>
                  <Route
                    path="/collection/:id"
                    element={
                      <AnonymousPage
                        component={CollectionPage}
                        layout={Layout}
                      />
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
                    element={
                      <AnonymousPage component={Search} layout={Layout} />
                    }
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
              </IntlProvider>
            </LocaleProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const LayoutDefault = ({ children }: any) => children;

function PrivatePage({
  layout: PageLayout = LayoutDefault,
  component: Comp,
}: any) {
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

function AnonymousPage({
  layout: PageLayout = LayoutDefault,
  component: Comp,
}: any) {
  const { user, onLogOut } = useContext(authContext);
  return (
    <PageLayout onLogOut={onLogOut} user={user}>
      <Comp />
    </PageLayout>
  );
}

export default App;
