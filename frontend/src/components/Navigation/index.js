import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">
        <button className='home-img3'>Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button className='home-img3'>Sign-Up</button>
        </NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <img src = "https://freeiconshop.com/wp-content/uploads/edd/book-flat.png" className='home-img' alt = "home-img"/>
        </NavLink>
      </li>
      <li>
        <h2>TELL US YOUR STORY</h2>
      </li>
      <li >
        {isLoaded && sessionLinks}

      </li>
    </ul>
  );
}

export default Navigation;