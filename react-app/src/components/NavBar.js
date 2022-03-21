import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostGameModal from '../components/Modals/PostGameModal'
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = () => {
  const userId = useSelector(state => state.session.user.id);

  return (
    <nav className='navbar'>
        <div className='navlinks'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <NavLink to={`/users/${userId}`} exact={true} activeClassName='active'>
            My Stuff
          </NavLink>
          <PostGameModal />
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
