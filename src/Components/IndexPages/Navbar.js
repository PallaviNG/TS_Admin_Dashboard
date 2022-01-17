import React, { useState } from "react";
import logo from "../Images/logo.png";
import user1 from "../Images/user-1.png";

import { Link } from "react-router-dom";

function Navbar({ user }) {
  let [searchToggle, setSearchToggle] = useState(false);
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
            <Link to="/view-profile"><img src={user1} className="avtar-image" alt="avatar-image" /></Link>
            <div className="logninMenu flex flex-direction-column align-items-center justify-content-center">
              <div className="flex align-items-center">
                <div className=" flex flex-direction-column align-items-center">
                  <p className="userName font-small">{user.admin_name.toUpperCase()}</p>
                  <span className="roleOfUser">{user.admin_role}</span></div>
                <div>
                  <Link to="/logout" className="dangerIcon ml-4" title="Logout"><i className="fa fa-2x fa-sign-out" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
