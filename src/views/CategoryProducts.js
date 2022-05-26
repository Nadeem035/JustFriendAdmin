import React, { useState, useEffect } from "react";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Modal,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Constants from "../services/constant";

function CategoryProducts() {
  const location = useLocation();
  const Category_id = location.state?.category_id;
  const Category_name = location.state?.category_name;
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState();
  const [productStatus, setproductStatus] = useState("");

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    setLoading(true);
    getData(Constants.END_POINT.CATEGORY_PRODUCT + Category_id).then((res) => {
      if (res) {
        if (res.success) {
          setLoading(false);
          // toast.success(res.message);
          setProducts(res.data);
        }
        if (res.error) {
          setLoading(false);
          toast.warn(res.message);
        }
      }
    });
  };
  const Enable = (id) => {
    setLoading(true);
    postData(Constants.END_POINT.UPDATE_PRODUCT, { id: id, isDeleted: 0 })
      .then((res) => {
        if (res) {
          if (res.success) {
            toast.success(res.message);
            getProductsList();
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
  const Disable = (id) => {
    setLoading(true);
    postData(Constants.END_POINT.UPDATE_PRODUCT, { id: id, isDeleted: 1 })
      .then((res) => {
        if (res) {
          if (res.success) {
            toast.success(res.message);
            getProductsList();
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
  const filterData = () => {
    let allData = Products;

    if (productStatus != null) {
      if (productStatus.value === "isSold") {
        console.log("sold");
        allData = allData.filter((obj) => {
          return obj.isSold === 1;
        });
      }
      if (productStatus.value === "isPopular") {
        allData = allData.filter(function (obj) {
          return obj.isPopular === 1;
        });
      }
      if (productStatus.value === "isDeleted") {
        allData = allData.filter(function (obj) {
          return obj.isDeleted === 1;
        });
      }
    }
    return allData;
  };
  const rendarProductList = () => {
    let allData = filterData();
    return allData.map((product, index) => (
      <tr key={index}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>
          <img
            src={Constants.BASE_URL + product.img}
            alt={product.name}
            width="50px"
          />
        </td>
        <td>{product.price}</td>
        <td>
          <Link
            to={{
              pathname: "/admin/ProductDetails",
              state: {
                product_id: product.id,
              },
            }}
          >
            <Button variant="info" size="sm">
              View
            </Button>
          </Link>
        </td>
        <td>
          {product.isDeleted ? (
            <Button
              onClick={() => {
                Enable(product.id);
              }}
              variant="success"
              size="sm"
            >
              Enable
            </Button>
          ) : (
            <Button
              onClick={() => {
                Disable(product.id);
              }}
              variant="danger"
              size="sm"
            >
              Disable
            </Button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <ToastContainer autoClose={2000} />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{Category_name} Products</Card.Title>
                <div className="d-flex flex-wrap justify-content-between">
                  <p className="card-category">
                    Here is a a list of {Category_name} Products
                  </p>
                  <div className="col-12 col-md-4 my-1">
                    <Select
                      className="dropdown mx-1"
                      value={productStatus}
                      onChange={(value) => setproductStatus(value)}
                      options={[
                        // { value: "isPopular", label: "Popular" },
                        { value: "isSold", label: "Sold" },
                        { value: "isDeleted", label: "Disabled" },
                      ]}
                      placeholder="All Products"
                      isSearchable={true}
                      backspaceRemovesValue={true}
                      isClearable={true}
                    />
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">View</th>
                      <th className="border-0">Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>{Products && rendarProductList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CategoryProducts;
