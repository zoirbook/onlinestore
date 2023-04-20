import React from "react";

import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(totalAmount);

  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"Shopping Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg={"9"}>
              {cartItems.length === 0 ? (
                <h2 className="fz-4 text-center">No product added to cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg={"3"}>
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in chekout
              </p>
              <div>
                <button className="buy__btn w-100">
                  <Link to={"/checkout"}>Checkout</Link>
                </button>
                <button className="buy__btn mt-3 w-100">
                  <Link to={"/shop"}>Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.removeItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          className="ri-delete-bin-line"
          whileTap={{ scale: 1.2 }}
          onClick={deleteItem}
        ></motion.i>
      </td>
    </tr>
  );
};
export default Cart;
