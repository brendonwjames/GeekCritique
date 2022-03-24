import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostGameModal from '../components/Modals/PostGameModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const defaultImg="https://images.nintendolife.com/428c8ddbb2c32/smm2.large.jpg"


  return (
    <nav className='navbar'>
        <div className='navlinks'>
          <NavLink to='/' exact={true} activeClassName='active'><FontAwesomeIcon icon="fa-solid fa-house" /></NavLink>
          <PostGameModal />
          <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
            <img className='navbar-profile-picture' alt='Try a new link' src={user.profile_picture ? user.profile_picture : defaultImg }/>
          </NavLink>
          <div className='username-greeting'>Hello, {user.username}</div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
