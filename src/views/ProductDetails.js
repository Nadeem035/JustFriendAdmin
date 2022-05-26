import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import Select from "react-select";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import {
  Badge,
  Button,
  InputGroup,
  FormControl,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Carousel,
} from "react-bootstrap";
import Constants from "../services/constant";

function ProductDetails(props) {
  const location = useLocation();
  const Product_id = location.state?.product_id;
  useEffect(() => {
    getProductDetail(Product_id);
  }, []);

  const [loading, setLoading] = useState(false);
  const [Product, setProduct] = useState("");
  const [Values, setValues] = useState({
    id: "",
    name: "",
    product_desc: "",
    price: "",
  });
  const { id, name, product_desc, price } = Values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...Values, [name]: value });
  };

  const UpdateProduct = (id) => {
    setLoading(true);
    postData(Constants.END_POINT.UPDATE_PRODUCT, Values)
      .then((res) => {
        if (res) {
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getProductDetail = (id) => {
    getData(Constants.END_POINT.PRODUCT + id).then((res) => {
      if (res?.success) {
        setProduct(res.data);
        setValues({
          id: res.data.id,
          name: res.data.name,
          product_desc: res.data.product_desc,
          price: res.data.price,
        });
      }
    });
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <ToastContainer autoClose={2000} />
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Edit Product</Card.Title>
                {Product.is_charity ? (
                  <p className="text-info">
                    Charity Name: {Product.foundation_name} Charity Amount:
                    {Product.charity_amt}
                  </p>
                ) : null}
                {Product.isSold ? <p className="text-danger">Sold</p> : null}
                {Product.isDeleted ? (
                  <p className="text-danger">Deleted</p>
                ) : null}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="px-1" md="7">
                      <Form.Group>
                        <label>Product Name</label>
                        <Form.Control
                          Value={name}
                          placeholder="Product Name"
                          type="text"
                          onChange={handleChange("name")}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          Value={price}
                          placeholder="Price"
                          type="text"
                          onChange={handleChange("price")}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Description</label>
                        <Form.Control
                          cols="80"
                          defaultValue={product_desc}
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                          onChange={handleChange("product_desc")}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {Product_id ? (
                    <Button
                      onClick={() => {
                        UpdateProduct(Product_id);
                      }}
                      className="btn-fill pull-right"
                      variant="info"
                    >
                      Update Product
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        createProduct();
                      }}
                      className="btn-fill pull-right"
                      variant="info"
                    >
                      Add Product
                    </Button>
                  )}
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <Card.Body>
                <div className="author mt-1">
                  <img
                    alt="..."
                    className="card-img-top shadow"
                    src={
                      Product?.img
                        ? Constants.BASE_URL + Product?.img
                        : require("assets/img/Logo.png").default
                    }
                  ></img>
                  <Form></Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetails;
