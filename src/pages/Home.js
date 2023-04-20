import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/counter-timer-img.png";
import { motion } from "framer-motion";

import "../styles/home.css";
import { Link } from "react-router-dom";
import Services from "../services/services";
import ProductsList from "../components/UI/ProductsList";

// import products from "../assets/data/products";
import Clock from "../components/UI/Clock";
import useGetData from "../custom-hooks/useGetData";

const Home = () => {
  const { data: products, loading } = useGetData("products");
  console.log(products);
  const year = new Date().getFullYear();

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const filteredTrendingProduct = products.filter(
      (item) => item.category === "chair"
    );
    setTrendingProducts(filteredTrendingProduct);

    const filteredBestSalesProduct = products.filter(
      (item) => item.category === "sofa"
    );
    setBestSalesProducts(filteredBestSalesProduct);

    const filteredMobileProduct = products.filter(
      (item) => item.category === "mobile"
    );
    setMobileProducts(filteredMobileProduct);

    const filteredWirelessProduct = products.filter(
      (item) => item.category === "wireless"
    );
    setWirelessProducts(filteredWirelessProduct);

    const filteredPopularProduct = products.filter(
      (item) => item.category === "watch"
    );
    setPopularProducts(filteredPopularProduct);
  }, [products]);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg={"6"} md={"6"}>
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Ut aute cillum proident fugiat. Eiusmod ipsum quis qui
                  voluptate est sint labore mollit enim culpa minim in. Ea
                  aliqua velit mollit minim nulla quis occaecat ex. Do anim et
                  occaecat tempor est quis.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to={"/shop"}>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg={"6"} md={"6"}>
              <div className="hero__img">
                <img src={heroImg} alt="Hero img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Trending Products</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading ...</h5>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Best Sales</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading ...</h5>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer_count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count-down__col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to={"/shop"}>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="counter img" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">New Arrivals</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading ...</h5>
            ) : (
              <ProductsList data={mobileProducts} />
            )}
            {loading ? (
              <h5 className="fw-bold">Loading ...</h5>
            ) : (
              <ProductsList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Popular in Category</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading ...</h5>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
