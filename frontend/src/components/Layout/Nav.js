import { useState } from "react";
import { Logout } from "../UserAuth/Logout";
import { AuthContext } from "../UserAuth/FirebaseAuth";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const history = useHistory();
  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-darkest mb-3 text-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between text-white">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start text-white">
            <div
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white cursor-pointer" style={{color: "white"}}
              onClick={() => history.push("/")}
            >
              MoonStock
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center text-white" +
              (navbarOpen ? " flex" : " hidden")
            } style={{color: "white"}}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <div
                  className="px-3 py-2 flex items-center text-white text-xs uppercase font-bold leading-snug hover:opacity-75 cursor-pointer" style={{color: "white"}}
                  onClick={() => history.push("/")}
                >
                  <span className="ml-2">Home</span>
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-pointer" style={{color: "white"}}
                  onClick={() => history.push("/dashboard")}
                >
                  <span className="ml-2">Dashboard</span>
                </div>
              </li>
              {currentUser ? <li><Link to="/watchlist" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" style={{color: "white"}}><span className="ml-2">Watchlist</span></Link></li> : ""}
              <li className="nav-item">
                {currentUser ? (
                  <button
                    onClick={() => Logout()}
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" style={{color: "white"}}
                  >
                    <span className="ml-2">Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" style={{color: "white"}}
                  >
                    <span className="ml-2">Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
