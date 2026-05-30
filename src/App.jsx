import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from './Components/Navigation/AppHeader';
import BottomNav from './Components/Navigation/BottomNav';
import DesktopSidebar from './Components/Navigation/DesktopSidebar';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import { SocialStorage } from './context/SocialContext';
import User from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Photo from './Components/Photo/Photo';
import UserProfile from './Components/User/UserProfile';
import NotFound from './Components/NotFound';
import ExplorePage from './Components/Explore/ExplorePage';
import ActivityPage from './Components/Activity/ActivityPage';

function AppShell() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/login');

  return (
    <div className="App">
      {!hideNav && <DesktopSidebar />}
      {!hideNav && <AppHeader />}
      <div className={`AppLayout ${hideNav ? 'AppLayout--auth' : ''}`}>
        <main className={`AppBody ${hideNav ? 'AppBody--auth' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<ExplorePage />} />
            <Route path="/atividade" element={<ActivityPage />} />
            <Route path="login/*" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="conta/*" element={<User />} />
            </Route>
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <SocialStorage>
          <AppShell />
        </SocialStorage>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
