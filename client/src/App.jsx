import React from "react";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Quiz from "./Pages/Quiz";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TextExtractor from "./Pages/Text_Extractor";
import Register from "./AuthPages/Register";
import Login from "./AuthPages/Login";
import VerifyEmail from "./AuthPages/VerifyEmail";
import ResetPassword from "./AuthPages/ResetPassword";
import { ToastContainer } from "react-toastify";
import Workspace from "./Pages/Workspace";

function App() {
  const Layout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <div className="">
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/text-extractor" element={<TextExtractor />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          
          <Route path="/workspace" element={<Workspace />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
