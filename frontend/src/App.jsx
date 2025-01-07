import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    // console.log("running check user");
    checkAuth();
  }, [checkAuth]);
  // console.log("user", authUser);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <SignInPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
