import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostGameModal from '../components/Modals/PostGameModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const defaultImg="https://scienceline.org/wp-content/uploads/2020/01/tetris.jpg"
  console.log(user, 'USER')


  return (
    <nav className='navbar'>
        <div className='navlinks'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <FontAwesomeIcon icon="fa-solid fa-house">
              <div className='tooltip-box-2'>Home</div>
            </FontAwesomeIcon>
          </NavLink>
          <PostGameModal />
          <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
            {/* <button className='to-profile-button'>Profile</button> */}
              <img className="navbar-profile-picture" src={user.profile_picture} alt="Faulty Url"></img>
          </NavLink>
          <div className='username-greeting'>Hello, {user.username}</div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
