import React, { useEffect, useRef } from "react";

import "./header.css";
import { Container, Row } from "reactstrap";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { NavLink, useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const Header = () => {
  const { currentUser } = useAuth();

  const headerRef = useRef();
  const menuRef = useRef();
  const profileActionRef = useRef(null);

  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const nav__link = [
    { path: "home", display: "Home" },
    { path: "shop", display: "Shop" },
    { path: "cart", display: "Cart" },
  ];

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt={"logo"} />
              <div>
                <h1>Onlinestore</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(NavClass) =>
                        NavClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <motion.span
                whileTap={{ scale: 1.2 }}
                className="cart_icon"
                onClick={navigateToCart}
              >
                <i className="ri-handbag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </motion.span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt={"User img"}
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile-actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logOut}>Log Out</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to={"/signup"}>Sign Up</Link>
                      <Link to={"/login"}>Login</Link>
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
              <motion.div
                whileTap={{ scale: 1.1 }}
                className="mobile_menu"
                onClick={menuToggle}
              >
                <i className="ri-menu-line"></i>
              </motion.div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
