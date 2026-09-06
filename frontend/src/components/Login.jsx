import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

import validation from "../utils/validation";
import netflixGPT from "../assets/netflixGPT-background.png";
import api from "../utils/axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const [signIn, signUp] = useState(true);
  const [error, setError] = useState(null);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleFeature = () => {
    signUp(!signIn);
    setError(null);
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const user = data.user;
      const token = await user.getIdToken();
      await api.post("/auth/google", { token });
      const userResponse = await api.get("/auth/me");
      dispatch(addUser(userResponse.data.user));
      navigate("/browse");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to log in with Google. Please try again.");
    }
  };

  const formValidation = async () => {
    const msg = validation(email.current.value, password.current.value);
    setError(msg);
    if (msg) return;

    if (!signIn) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        await api.post("/auth/signup", { token, name: name.current.value });
        toggleFeature();
      } catch (error) {
        console.log("Signup error:", error);
        setError("User Email Already Exists. Please try logging in.");
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        await api.post("/auth/login", { token });
        const userResponse = await api.get("/auth/me");
        dispatch(addUser(userResponse.data.user));
        navigate("/browse");
      } catch (error) {
        console.error("Login error:", error);
        setError("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <img
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={netflixGPT}
        alt="background"
      />

      <div className="fixed top-0 left-0 w-full h-full z-10"></div>

      <div className="relative z-20 flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="bg-black/80 p-8 sm:p-12 lg:p-16 rounded-md w-full max-w-[450px] shadow-2xl">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
              {signIn ? "Sign In" : "Sign Up"}
            </h1>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {!signIn && (
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 pl-12 bg-gray-700/60 rounded-md text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              )}

              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  ref={email}
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 pl-12 bg-gray-700/60 rounded-md text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 pl-12 bg-gray-700/60 rounded-md text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-circle-exclamation"></i> {error}
                </p>
              )}

              <button
                type="submit"
                onClick={formValidation}
                className="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
              >
                <i
                  className={`fas ${signIn ? "fa-sign-in-alt" : "fa-user-plus"}`}
                ></i>
                {signIn ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full p-3 bg-white hover:bg-gray-200 text-black font-bold rounded-md transition-all flex items-center justify-center gap-3 mt-4"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex justify-between items-center mt-4 text-sm">
            <a href="#" className="text-gray-400 hover:underline">
              Forgot password?
            </a>
            <div className="flex items-center space-x-2 text-gray-400">
              <input
                type="checkbox"
                id="remember-me"
                className="accent-red-600 h-4 w-4"
              />
              <label htmlFor="remember-me" className="cursor-pointer">
                Remember me
              </label>
            </div>
          </div>

          <div className="mt-10 text-gray-400">
            {signIn ? "New to NetflixGPT?" : "Already a member?"}{" "}
            <span
              onClick={toggleFeature}
              className="text-white font-bold cursor-pointer hover:underline"
            >
              {signIn ? "Sign up now." : "Sign in now."}
            </span>
          </div>

          <div className="mt-6 text-[11px] text-gray-500 leading-tight">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
              <span className="text-blue-500 hover:underline cursor-pointer ml-1">
                Learn more.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
