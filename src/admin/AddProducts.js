import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage, db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredShortDec, setEnteredShortDec] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredImg, setEnteredImg] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    // const product = {
    //   title: enteredTitle,
    //   shortDesc: enteredShortDec,
    //   description: enteredDesc,
    //   category: enteredCategory,
    //   price: enteredPrice,
    //   imgUrl: enteredImg,
    // };

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(storage, `productImages/${enteredImg.name}`);

      const uploadTask = uploadBytesResumable(storageRef, enteredImg);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enteredTitle,
              shortDesc: enteredShortDec,
              description: enteredDesc,
              category: enteredCategory,
              price: enteredPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product added successfully");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("Product not added");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-12">
            {loading ? (
              <h4>Loading ...</h4>
            ) : (
              <>
                <h4 className="mb-5">Add product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <label>Product Title</label>
                    <Input
                      type="text"
                      placeholder="Double sofa"
                      value={enteredTitle}
                      onChange={(e) => setEnteredTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <Input
                      type="text"
                      placeholder="Lorem ..."
                      value={enteredShortDec}
                      onChange={(e) => setEnteredShortDec(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <Input
                      type="text"
                      placeholder="description ..."
                      value={enteredDesc}
                      onChange={(e) => setEnteredDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <Input
                        type="number"
                        placeholder="$100"
                        value={enteredPrice}
                        onChange={(e) => setEnteredPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <Input
                        type="select"
                        value={enteredCategory}
                        onChange={(e) => setEnteredCategory(e.target.value)}
                      >
                        <option>Select</option>
                        <option value={"sofa"}>Sofa</option>
                        <option value={"chair"}>Chair</option>
                        <option value={"mobile"}>Mobile</option>
                        <option value={"watch"}>Watch</option>
                        <option value={"wireless"}>Wireless</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form__group">
                      <span>Products image</span>
                      <Input
                        type="file"
                        required
                        onChange={(e) => setEnteredImg(e.target.files[0])}
                      />
                    </FormGroup>
                  </div>

                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    type="submit"
                  >
                    Add Product
                  </motion.button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
