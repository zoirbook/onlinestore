import React, { Fragment } from "react";
import Header from "../Header/Header";
import Routers from "../../routers/Routers";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";

const Layout = () => {
  const location = useLocation();
  return (
    <Fragment>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
