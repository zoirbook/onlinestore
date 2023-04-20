import React from "react";
import { Col, Container, Row } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted!");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg={"12"}>
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg={"12"} className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h3 className="py-5">Loading...</h3>
                ) : (
                  usersData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt={"Img"} />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteUser(user.uid);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
