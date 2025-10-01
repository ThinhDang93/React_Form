import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

const UserPageMaster = () => {
  return (
    <>
      <Header />
      <div className="constanier mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserPageMaster;
