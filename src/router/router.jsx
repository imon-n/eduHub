import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CourseDetail from "../pages/Courses/CourseDetail";
import Courses from "../pages/Courses/Courses";
import ApprovedCourses from "../pages/Dashboard/Admin/ApprovedCourses/ApprovedCourses";
import MakeAdmin from "../pages/Dashboard/Admin/MakeAdmin/MakeAdmin";
import MakeTutor from "../pages/Dashboard/Admin/MakeTutor/MakeTutor";
import PendingCourses from "../pages/Dashboard/Admin/PendingCourses/PendingCourses";
import Overview from "../pages/Dashboard/Overview";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import BookedSessions from "../pages/Dashboard/Student/BookedSessions";
import CreateNote from "../pages/Dashboard/Student/CreateNote";
import MyNotes from "../pages/Dashboard/Student/MyNotes";
import CreateCourse from "../pages/Dashboard/Tutor/CreateCourse";
import MySessions from "../pages/Dashboard/Tutor/MySessions";
import UpdateCourse from "../pages/Dashboard/Tutor/UpdateCourse";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllTutors from "../pages/Tutors/AllTutors";
import AdminRoute from "../routes/AdminRoute";
import PrivateRoute from "../routes/PrivateRoute";
import TutorRoutes from "../routes/TutorRoute";
import Rejected from "../pages/Dashboard/Tutor/Rejected";
import UploadMaterial from "../pages/Dashboard/Tutor/UploadMaterial";
import ManageMaterials from "../pages/Dashboard/Admin/ManageMaterials/ManageMaterials";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "courses",
        Component: Courses,
      },
      {
        path: "tutors",
        Component: AllTutors,
      },
      {
        path: "/courses/:id",
        Component: CourseDetail,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
      },
      {
        path: "error-page",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: "createNote",
        Component: CreateNote,
      },
      {
        path: "myNotes",
        Component: MyNotes,
      },
      {
        path: "payment/:courseId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "bookedSession",
        Component: BookedSessions,
      },
      {
        path: "UploadMaterial",
        Component: UploadMaterial,
      },
      {
        path: "createCourse",
        element: (
          <TutorRoutes>
            <CreateCourse></CreateCourse>
          </TutorRoutes>
        ),
      },
      {
        path: "mySessions",
        element: (
          <TutorRoutes>
            <MySessions></MySessions>
          </TutorRoutes>
        ),
      },
      {
        path: "updateSession/:id",
        element: (
          <TutorRoutes>
            <UpdateCourse></UpdateCourse>
          </TutorRoutes>
        ),
      },
      {
        path:'rejectedSession',
        element: (
          <TutorRoutes>
            <Rejected></Rejected>
          </TutorRoutes>
        ),
      },
      {
        path: "approvedCourses",
        element: (
          <AdminRoute>
            <ApprovedCourses></ApprovedCourses>
          </AdminRoute>
        ),
      },
      {
        path: "pendingCourses",
        element: (
          <AdminRoute>
            <PendingCourses></PendingCourses>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "ManageMaterials",
        element: (
          <AdminRoute>
            <ManageMaterials></ManageMaterials>
          </AdminRoute>
        ),
      },
      {
        path: "makeTutor",
        element: (
          <AdminRoute>
            <MakeTutor></MakeTutor>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
