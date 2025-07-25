import { Link, useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import logo from "../assets/images/logo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <Link to="/" className="hover:text-white">Home</Link>
      </li>
      <li>
        <Link to="/tutors" className="hover:text-white">Tutors</Link>
      </li>
      <li>
        <Link to="/courses" className="hover:text-white">Sessions</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-[#96ac35] text-white px-4 py-3">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        <img src={logo} alt="StudyZone Logo" className="w-10 h-10 rounded-full" />
        <Link to="/" className="text-2xl font-bold tracking-wide">
          StudyZone
        </Link>
      </div>

      {/* Navbar Center (menu for large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold space-x-4">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End (avatar/login/register) */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-11 rounded-full">
                <img src={user.photoURL} alt={user.displayName} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-100 text-black shadow-md rounded-box mt-4 w-52 p-4 space-y-2 z-[999]"
            >
              <li className="text-center font-semibold">{user.displayName}</li>
              <hr />
              {navLinks}
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-error w-full text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-info text-white px-5">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary text-white px-5">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
