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
import PostGame from './components/Game/PostGame';
import EditGame from './components/Game/EditGame';

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
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
          <AllGames />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/games' exact={true}>
          <Game />
        </ProtectedRoute> */}
        <ProtectedRoute path='/new_game' exact={true}>
          <PostGame />
        </ProtectedRoute>
        <ProtectedRoute path='/edit_game' exact={true}>
          <EditGame />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
