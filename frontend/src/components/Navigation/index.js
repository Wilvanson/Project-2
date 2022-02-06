import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemo = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password'}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <button onClick={handleDemo}>Demo</button>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      <li >
        {isLoaded && sessionLinks}

      </li>
    </ul>
  );
}

export default Navigation;