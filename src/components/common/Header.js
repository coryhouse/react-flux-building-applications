import React from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
  const activeStyle = { color: 'blue' };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
    </nav>
  );
};

export default Header;
