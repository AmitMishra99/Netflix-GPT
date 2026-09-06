import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./store/userSlice";
import api from "./utils/axios";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        dispatch(addUser(res.data.user));
      } catch (error) {
        dispatch(removeUser());
        console.log("User not logged in", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={user ? <Navigate to="/browse" replace /> : <Login />}
        />

        {/* Protected Home Page */}
        <Route
          path="/browse"
          element={user ? <Browse /> : <Navigate to="/" replace />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
