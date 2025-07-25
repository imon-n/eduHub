import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-center text-center mt-20 ">
        <div className="w-64">
          <img src="https://i.ibb.co/rfNW93fb/error.jpg" className="mx-auto" />
        </div>
      </div>
      <div className="space-y-2 text-center ">
        <h1 className="text-lg font-bold text-red-600">
          404 - Page Not Found, You Can Try again
        </h1>
        <p>Oops! The page you're looking for doesn't exist !</p>
        <Link
          to="/"
          className="btn rounded-xl mb-30 px-5 py-1 bg-green-800 text-white"
        >
          Go to Home
        </Link>
      </div>
    </>
  );
};
export default ErrorPage;
