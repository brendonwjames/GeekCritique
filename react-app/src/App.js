import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllGames from './components/Game/AllGames';
import Footer from './components/Footer/Footer';
import UserShelves from './components/Shelf/UserShelves';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
          <Footer />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <AllGames />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/shelves' exact={true} >
          <NavBar />
          <Footer />
          <UserShelves />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
