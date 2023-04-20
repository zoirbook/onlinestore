import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth, db, storage } from "../firebase.config";
import { toast } from "react-toastify";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import "../styles/login.css";
import { motion } from "framer-motion";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await userCredential.user;

      const storageRef = ref(storage, `images/${username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg={"12"} className="text-center">
                <h3 className="fw-bold">Loading ...</h3>
              </Col>
            ) : (
              <Col lg={"6"} className="m-auto text-center">
                <h3 className="fw-bold mb-4">Sign Up</h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    type="submit"
                    className="buy__btn auth__btn"
                  >
                    Create an Account
                  </motion.button>
                  <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
