import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [profile_img_src, setProfileImgSrc] = useState('');
  const user = useSelector(state => state.session.user);
  
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

      const data = await dispatch(signUp(username, email, password, confirm_password, profile_img_src));
      console.log(data)
      if (data) {
        setErrors(data)
      }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateProfilePicture = (e) => {
    setProfileImgSrc(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-container'>
      <div className='signup-form'>
      <div>
        <h2 className='site-title'>GeekCritique</h2>
        <h5 className='signup-message'>Sign up to view games!</h5>
      </div>
      
    <form className='form-signup' onSubmit={onSignUp}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Username</label>
        <input
          className='login-input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          className='login-input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          className='login-input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          className='login-input'
          type='password'
          name='repeat_password'
          onChange={updateConfirm}
          value={confirm_password}
          // required={true}
        ></input>
        <div>
         <label>Profile Picture URL</label>
          <input
          className='login-input'
          type='text'
          name='profile_picture'
          onChange={updateProfilePicture}
          // required={true}
        ></input>
      </div>
        </div>
      <button className='login-buttons' type='submit'>Sign Up</button>
    </form>
    </div>
        <div className='bottom-signup'>
        <p className='text'>Have an account?</p>
        <NavLink to="/login">Login</NavLink>
        </div>
    </div>
  );
};

export default SignUpForm;
