import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
const Login_SignUp = () => {
  const [flipped, setFlipped] = useState(false);
  const { movies } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { Login, SignUp, LoginWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!uppercase.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!lowercase.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  return null; // valid
};

  const googleLogin = async () => {
    try {
      await LoginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await Login(email, password);
      navigate(from, { replace: true }); // redirect after success
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    const error = validatePassword(password);
  if (error) {
    Swal.fire({ icon: "error", title: "Invalid Password", text: error });
    return;
  }
    try {
      await SignUp(name, email, password);
      navigate(from, { replace: true }); // redirect after success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div
        className="absolute inset-0 -z-10 overflow-hidden perspective"
        style={{ perspective: "1000px" }}
      >
        <div
          className="grid grid-cols-6 gap-4 w-full relative max-sm:top-70 max-sm:right-70 h-screen sm:h-full translate-z-30"
          style={{
            transform:
              "rotateY(20deg) rotateZ(10deg) translateY(-200px) translateZ(400px) translateX(70px)",
            transformOrigin: "bottom left",
          }}
        >
          {movies.map((movie) => (
            <img
              key={movie._id}
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg opacity-60 border border-red-500/30"
            />
          ))}
        </div>

        {}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      {}
      <div
        className={`relative w-full max-w-sm ${
          flipped ? "h-[410px]" : "h-[400px]"
        } perspective`}
        style={{ perspective: "1000px" }}
      >
        {}
        <div
          className={`relative w-full h-full transition-transform duration-700 transform ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {}
          <div
            className="absolute w-full h-full backface-hidden max-sm:px-5"
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <div className=" card bg-black shadow-red-500 border-red-500/60 border-2 w-full h-full flex flex-col justify-center shadow-2xl p-6">
              <form onSubmit={handleLogin}>
                <h1 className="text-3xl font-black text-white mb-6">Login</h1>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input mb-4"
                />

                <div className="flex relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input mb-4"
                  />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-5.5 top-2.5 z-90"
                  >
                    {showPassword ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>}
                  </div>
                </div>
                <div className="mb-4">
                  <a className="link link-hover text-gray-400">
                    Forgot password?
                  </a>
                </div>
                <button className="btn btn-primary w-full" type="submit">
                  Login
                </button>
                <button
                  onClick={googleLogin}
                  type="submit"
                  className="btn btn-outline w-full flex items-center justify-center mt-4"
                >
                  <FcGoogle className="mr-2 text-lg" /> Continue with Google
                </button>
              </form>
              <button
                className="btn btn-outline mt-4 w-full"
                onClick={() => setFlipped(true)}
              >
                Sign Up
              </button>
            </div>
          </div>

          {}
          <div
            className="absolute w-full h-full backface-hidden rotate-y-180 max-sm:px-5"
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className=" card bg-black shadow-red-500 border-red-500/60 border-2 w-full h-full flex flex-col justify-center shadow-2xl p-6">
              <form onSubmit={handleSignUp}>
                <h1 className="text-3xl font-black text-white mb-6">Sign Up</h1>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input mb-4"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input mb-4"
                />

                <div className="flex relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input mb-4"
                  />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-5.5 top-2.5"
                  >
                    {showPassword ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>}
                  </div>
                </div>
                <button className="btn btn-primary w-full " type="submit">
                  Sign Up
                </button>
                <button
                  onClick={googleLogin}
                  className="btn btn-outline w-full flex items-center justify-center mt-4"
                >
                  <FcGoogle className="mr-2 text-lg" /> Continue with Google
                </button>
              </form>
              <button
                className="btn btn-outline mt-4 w-full"
                onClick={() => {
                  setFlipped(false);
                }}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_SignUp;
