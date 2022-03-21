import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostGameModal from '../components/Modals/PostGameModal'
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className='navbar'>
        <div className='navlinks'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
            My Stuff
          </NavLink>
          <PostGameModal />
          <LogoutButton />
          <div>Hello, {user.username}</div>
        </div>
    </nav>
  );
}

export default NavBar;
