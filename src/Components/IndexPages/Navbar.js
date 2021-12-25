import React, { useState } from "react";
import logo from "../Images/logo.png";
import user1 from "../Images/user-1.png";

import { Link } from "react-router-dom";

function Navbar({ user }) {
  let [searchToggle, setSearchToggle] = useState(false);
  let [dropdownToggle, setDropdownToggle] = useState(false);
  return (
    <>
      <nav className="navbar flex align-items-center">
        <img src={logo} alt="logo" />
        <div className="right-section flex justify-content-flex-end align-items-center">
          {searchToggle === true ? (
            <input
              type="text"
              name="search_box"
              id="search_box"
              className="openTextBox"
            />
          ) : null}
          <ul className="right-menu flex align-items-center justify-content-center">
            <li>
              <span
                className="search_icon links"
                onClick={() => {
                  setSearchToggle(!searchToggle);
                }}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </li>
            <li>
              <Link className="links" to="/page-not-found">
                <span>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </Link>
            </li>
            <li>
              <Link className="links" to="/new-batch-form">
                <span>
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                </span>
              </Link>
            </li>
          </ul>


          <div className="loginMenuSection flex ">
            <img src={user1} className="avtar-image" alt="avatar-image" />
            <div className="logninMenu flex flex-direction-column align-items-center justify-content-center">
              <div className="flex align-items-center">
                <p className="userName">{user.admin_name.toUpperCase()}</p>
                <div className="faIcons caretDown dropdown flex justify-content-center align-items-center">
                  <button onClick={() => {
                    setDropdownToggle(!dropdownToggle);
                  }}><i className="fa fa-caret-down" aria-hidden="true"></i></button>
                </div>
                {dropdownToggle === true ? ( 
                  <div className="dropdown_content">
                    <Link className="links" to="/logout">Logout</Link>
                  </div>
                ) : null}
              </div>
              <span className="roleOfUser">{user.admin_role}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
