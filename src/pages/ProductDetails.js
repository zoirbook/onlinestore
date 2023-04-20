import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
// import products from "../assets/data/products";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";

import "../styles/product-details.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const { data: products } = useGetData("products");
  console.log(products);
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState();

  const reviewName = useRef("");
  const reviewMsg = useRef("");

  const { id } = useParams();
  console.log(id);

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such products!");
      }
    };

    getProduct();
    console.log(products);
  }, []);

  const dispatch = useDispatch();

  // const product = products.find((item) => item.id === id);
  // console.log(product);

  const {
    productName,
    imgUrl,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewName.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      author: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    reviewName.current.value = "";
    reviewMsg.current.value = "";
    setRating(null);

    toast.success("review submitted");
    console.log(reviewObj);
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section>
        <Container>
          <Row>
            <Col lg={"6"}>
              <img src={imgUrl} alt={"k"} />
            </Col>
            <Col lg={"6"}>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>{/* (<span>{avgRating}</span>ratings) */}</p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category && category.toUpperCase()}</span>
                </div>
                <p className="mt-4">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg={"12"}>
              <div className="tab__wrapper">
                <h5
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h5
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h5>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="product__wrapper">
                    {/* <ul>
                      {reviews.map((item, index) => (
                        <li key={index}>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul> */}
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewName}
                            required
                          />
                        </div>
                        <div className="form-group d-flex align-items-center gap-5">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form-group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message"
                            ref={reviewMsg}
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg={"12"} className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
