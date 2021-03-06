import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async(e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-container'>
      <img className='login-img' src='https://wallpaperaccess.com/full/1126067.jpg' alt='Broken img link'></img>
      <div>
      <form className='form-container' onSubmit={onLogin}>
        <div className='right-div'>
        <h3 className='title'>Geek Critique</h3>
          <div>
            <label htmlFor='email'></label>
            <input
              className='login-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'></label>
            <input
            className='login-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='buttons-container'>
            <div>
              <button className='login-button' type='submit'>Login</button>
            </div>
            <div>
              <button className='login-button' type='submit' onClick={demoUser}>Demo User</button>
            </div>
          </div>
          <div className='login-errors-container'>
          {errors.map((error, ind) => (
            <div className='login-errors' key={ind}>{error}</div>
          ))}
        </div>
        </div>
      </form>
      <div className='signup-option'>
        <p className='signup-text'>
          Don't have an account?
        </p>
        <NavLink to='/sign-up'>Sign Up</NavLink>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
