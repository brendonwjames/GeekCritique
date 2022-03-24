import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></button>;
};

export default LogoutButton;
