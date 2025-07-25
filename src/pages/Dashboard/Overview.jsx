import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const Overview = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#96ac35]"></div>
      </div>
    );
  }

  // Summary labels for each role (without counts)
  const summaryLabels = {
    user: ["Courses Enrolled", "Upcoming Sessions", "Materials Accessed"],
    tutor: ["Courses Created", "Sessions Scheduled", "Materials Uploaded"],
    admin: ["Total Users", "Pending Approvals", "Materials Managed"],
  };

  // Quick links by role
  const quickLinks = {
    user: [
      { label: "My Notes", to: "/dashboard/myNotes" },
      { label: "Booked Sessions", to: "/dashboard/bookedSession" },
      { label: "Payment History", to: "/dashboard/paymentHistory" },
      { label: "Update Profile", to: "/dashboard/profile" },
    ],
    tutor: [
      { label: "Create Course", to: "/dashboard/createCourse" },
      { label: "My Sessions", to: "/dashboard/mySessions" },
      { label: "Upload Material", to: "/dashboard/UploadMaterial" },
      { label: "Update Profile", to: "/dashboard/profile" },
    ],
    admin: [
      { label: "Approved Courses", to: "/dashboard/approvedCourses" },
      { label: "Pending Courses", to: "/dashboard/pendingCourses" },
      { label: "Make Admin", to: "/dashboard/makeAdmin" },
      { label: "Make Tutor", to: "/dashboard/makeTutor" },
      { label: "Manage Materials", to: "/dashboard/ManageMaterials" },
      { label: "Update Profile", to: "/dashboard/profile" },
    ],
  };

  const summaries = summaryLabels[role] || [];
  const links = quickLinks[role] || [];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-[70vh]">
      <h1 className="text-4xl font-bold text-[#96ac35] mb-6">
        Welcome Back, {user.displayName}!
      </h1>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold capitalize">{role}</span>
      </p>

      {/* Summary cards without counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {summaries.map((label) => (
          <div
            key={label}
            className="bg-[#e6f0c9] p-6 rounded-lg shadow flex flex-col items-center"
          >
            <span className="text-3xl font-bold text-[#5a7d1c]">—</span>
            <span className="mt-2 font-semibold text-[#5a7d1c]">{label}</span>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-2xl font-semibold text-[#96ac35] mb-4">
          Quick Access
        </h2>
        <div className="flex flex-wrap gap-4">
          {links.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="btn bg-[#96ac35] text-white rounded-full px-6 py-3 hover:bg-[#7b8e24] transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
