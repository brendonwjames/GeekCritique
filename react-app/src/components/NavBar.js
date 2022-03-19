import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostGameModal from '../components/Modals/PostGameModal'
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
        <div className='navlinks'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
          <PostGameModal />
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
