import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginBtn";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    Swal.fire({
      title: "You Are About To LogOut?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut",
    }).then((result) => {
      if (result.isConfirmed) {
        LogOut();
        Swal.fire({
          title: "Logged Out Successfully!",
          text: "See You Next Time",
          icon: "success",
        });
      }
    });
  };

  const links = (
    <>
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/allmovies" className="hover:text-primary">
        All Movies
      </NavLink>
      <NavLink to="/my-collection" className="hover:text-primary">
        My Collection
      </NavLink>
      {user && (
        <NavLink to="/movies/addmovies" className="hover:text-primary">
          Add Movies
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        {}
        <div className="drawer z-50 lg:hidden">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="nav-drawer" className="btn btn-ghost relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>

          {}
          <div className="drawer-side">
            <label htmlFor="nav-drawer" className="drawer-overlay"></label>
            <ul className="menu bg-gray-950 text-white min-h-full w-[70vw] p-4 space-y-3">
              {[...React.Children.toArray(links.props.children)].map(
                (link, i) => (
                  <li
                    key={i}
                    className="max-sm:text-lg font-semibold hover:bg-gray-800 rounded-lg px-2 py-2 transition"
                  >
                    {link}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {}
        <Link to="/" className="btn btn-ghost text-xl max-sm:hidden">
          Movie Master Pro
        </Link>
      </div>

      <Link to="/" className="btn btn-ghost text-xl sm:hidden text-center">
        Movie Master Pro
      </Link>

      {}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-3 font-semibold *:hover:text-primary">
          {links}
        </ul>
      </div>

      {}
      <div className="navbar-end">
        <div className="relative left-11 sm:left-2 max-sm:hidden">
          <SearchBar />
        </div>

        <button className="button">
          <div className="indicator max-sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 bell"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png"
                  }
                  alt="profile"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-90 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profileoredit">Profile</Link>
              </li>
              <li>
                <Link to="/watchlist">Watch List</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login_signup">
            <LoginButton />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;