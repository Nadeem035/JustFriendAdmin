import React, { useState, useEffect } from "react";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import Constants from "../services/constant";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

function User() {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState("");
  const [UserData, setUserData] = useState();

  useEffect(() => {
    funcGetUser(user_id);
    getUserProductList(user_id);
  }, []);

  const funcGetUser = (user_id) => {
    setLoading(true);
    getData(Constants.END_POINT.USER + `${user_id}`).then((res) => {
      if (res) {
        console.log(res);
        if (res.success) {
          setUserData(res.data);
          setLoading(false);
        }
        if (res.error) {
          toast.warn(res.message);
        }
      }
    });
  };
  const userCard = () => {
    return (
      <Card className="card-user">
        <div className="card-image primary">
          <img
            className="mt-1 p-2"
            alt="..."
            src={require("assets/img/Logo.png").default}
          ></img>
        </div>
        <Card.Body>
          <div className="author">
            <img
              alt="..."
              className="avatar border-gray primary"
              src={
                UserData?.userImg
                  ? UserData?.userImg.includes("http")
                    ? UserData?.userImg
                    : Constants.BASE_URL + UserData?.userImg
                  : require("assets/img/Logo.png").default
              }
            ></img>
            <h5 className="title">User Name: {UserData.name}</h5>

            <p className="description">User Email: {UserData.email}</p>
            <p className="description">
              User Created: {UserData.createdDtm.slice(0, 10)}
            </p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const getUserProductList = (user_id) => {
    getData(Constants.END_POINT.USER_PRODUCT + user_id).then((res) => {
      if (res) {
        console.log(res);
        if (res.success) {
          setProducts(res.data);
        }
        if (res.error) {
          toast.warn(res.message);
        }
      }
    });
  };
  const rendarProductList = (products) => {
    return products.map((Product, index) => (
      <tr key={index}>
        <td>#{Product.id}</td>
        <td>{Product?.name}</td>
        <td>{Product?.price}</td>
        <td>
          <img src={Constants.BASE_URL + Product?.img} alt="" width="50px" />
        </td>
        <td>
          <Link
            to={{
              pathname: "/admin/ProductDetails",
              state: {
                product_id: Product.id,
              },
            }}
          >
            <Button variant="info" size="sm">
              View Details
            </Button>
          </Link>
        </td>
        <td></td>
      </tr>
    ));
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <ToastContainer autoClose={2000} />
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Products By User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Card className="strpied-tabled-with-hover">
                        <Card.Body className="table-full-width table-responsive px-0">
                          <Table className="table-hover table-striped">
                            <thead>
                              <tr>
                                <th className="border-0">P.ID</th>
                                <th className="border-0">Name</th>
                                <th className="border-0">Price</th>
                                <th className="border-0">Image</th>
                                <th className="border-0">View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!Products.length ? (
                                <tr>
                                  <td colspan="5" className="text-center">
                                    No Product Added By User
                                  </td>
                                </tr>
                              ) : null}
                              {Products && rendarProductList(Products)}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">{UserData && userCard()}</Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
