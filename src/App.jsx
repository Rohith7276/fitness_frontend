import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import VideStream from "./components/VideoStream";
import Home from "./pages/Home";
import {  Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import CreateGroupPage from "./pages/CreateGroupPage";
import Workout from "./pages/Workout";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

    

  return (
    <div data-theme={theme}>
      <Navbar />



      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} /> 
        <Route path="/community" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> 
        <Route path="/workout" element={authUser ? <Workout /> : <Navigate to="/login" />} /> 
        
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/workouts" exact element={<Workouts />} />
        
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/create-group" element={authUser ? <CreateGroupPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App; 
 