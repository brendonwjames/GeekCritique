import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LogoutButton.css';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logout-button-container' onClick={onLogout}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
    <div className='text-box'>Logout</div>
  </button>;
};

export default LogoutButton;
