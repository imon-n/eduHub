import {
  FaHome,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserShield,
} from "react-icons/fa";
import { NavLink, Outlet, Link } from "react-router";
import useUserRole from "../hooks/useUserRole";
import Logo1 from "../pages/Logo/Logo";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ====== Page Content ====== */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Top Navbar */}
        <div className="navbar bg-[#96ac35] text-white px-4 py-3 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 font-semibold text-lg pl-3">Dashboard</div>
        </div>

        {/* Render page component here */}
        <div className="p-4 min-h-screen bg-base-100">
          <Outlet />
        </div>
      </div>

      {/* ====== Sidebar Menu ====== */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#96ac35] text-white space-y-2 text-lg font-semibold">
          <Logo1 />

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "bg-white text-[#96ac35]" : undefined
              }
            >
              <FaHome className="inline-block mr-2" />
              Dashboard Home
            </NavLink>
          </li>

          {!roleLoading && role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/createNote"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  Create Note
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myNotes"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  My Note
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaMoneyCheckAlt className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/bookedSession"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaMoneyCheckAlt className="inline-block mr-2" />
                  Booked Sessions
                </NavLink>
              </li>
            </>
          )}

          <li>
            <Link
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "bg-white text-[#96ac35]" : undefined
              }
            >
              <FaUserEdit className="inline-block mr-2" />
              Update Profile
            </Link>
          </li>

          {/* tutor links  */}
          {!roleLoading && role === "tutor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/createCourse"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  Create Course
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/mySessions"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  My Session
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/UploadMaterial"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  Upload Material
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/rejectedSession"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaHome className="inline-block mr-2" />
                  Rejected Sessions
                </NavLink>
              </li>
            </>
          )}

          {/* admin control pannel */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/approvedCourses"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaUserEdit className="inline-block mr-2" />
                  Approved Courses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pendingCourses"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-[#96ac35]" : undefined
                  }
                >
                  <FaUserEdit className="inline-block mr-2" />
                  Pending Courses
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="inline-block mr-2" />
                  Make Admin
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/makeTutor">
                  <FaUserShield className="inline-block mr-2" />
                  Make Tutor
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/ManageMaterials">
                  <FaUserShield className="inline-block mr-2" />
                  Manage Materials
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
