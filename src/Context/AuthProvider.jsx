import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Loader from "../Components/Loader";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import axios from "axios";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [totalUser, setTotalUser] = useState([]);

  // Fetch total users
  useEffect(() => {
    const totalUserGet = async () => {
      const res = await axios.get("http://localhost:5020/users");
      setTotalUser(res.data);
    };
    totalUserGet();
  }, []);

  const DeleteAccount = () => {
    deleteUser(auth.currentUser).catch((err) =>
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      })
    );
  };

const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setCheckingAuth(false); // done checking
  });

  return () => unsubscribe();
}, []);

  const UpdateProfile = async (name, photoURL) => {
    try {
      setLoading(true);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
        setUser({ ...auth.currentUser });
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
        });
        await axios.patch(`http://localhost:5020/users?email=${auth.currentUser.email}`, {
          name: name,
          photoURL: photoURL,
        });
        console.log(name,photoURL);
        
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const LogOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Sign Out Successfully",
      });
      setUser(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5020/movies");
        setMovies(res.data);
        setAllMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const SignUp = async (name, email, password) => {
    try {
      setLoading(true);
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.includes("google.com")) {
        Swal.fire({
          icon: "info",
          title: "Google Account Exists",
          text: "This email is already registered with Google. Please log in using Google.",
        });
        return;
      }
      if (methods.includes("password")) {
        Swal.fire({
          icon: "info",
          title: "Account Exists",
          text: "This email is already registered. Please log in instead.",
        });
        return;
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      setUser(res.user);

      await axios.post("http://localhost:5020/users", {
        name,
        email,
        password,
        photoURL: "",
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "info",
          title: "Email Already Registered",
          text: "This email is already in use. Try logging in or use Google login if you registered that way.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || err.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const Login = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      Swal.fire({
        title: "Logged In Successfully!",
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
    } finally {
      setLoading(false);
    }
  };

  const GoogleProvider = new GoogleAuthProvider();
  const LoginWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, GoogleProvider);
      const user = res.user;

      Swal.fire({
        title: "Logged In Successfully!",
        icon: "success",
      });

      const { data } = await axios.get(`http://localhost:5020/users?email=${user.email}`);
      if (data.length === 0) {
        await axios.post("http://localhost:5020/users", {
          name: user.displayName,
          email: user.email,
          password: "",
          photoURL: user.photoURL,
        });
      }

      setUser(user);
      return user;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.code,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    LoginWithGoogle,
    user,
    movies,
    setMovies,
    loading,
    setLoading,
    allMovies,
    setAllMovies,
    SignUp,
    Login,
    LogOut,
    UpdateProfile,
    DeleteAccount,
    totalUser,
    checkingAuth,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;