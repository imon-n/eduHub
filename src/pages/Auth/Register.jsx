import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updateUserProfile, createUser,setUser } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate(); 

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result);
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userInfo);

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        updateUserProfile(userProfile)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Welcome to the platform!",
              confirmButtonColor: "#3085d6",
            }).then(() => {
              navigate("/"); 
            });
            setUser(result.user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 border border-green-700 px-10">
        <h2 className="font-semibold text-2xl text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* image field */}
            <label className="label">Upload Your Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input"
            />

            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">Register</button>
          </fieldset>
          <p>
            <small>
              Already have an account?{" "}
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
