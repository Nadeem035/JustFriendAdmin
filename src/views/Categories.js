import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";

import {
  Button,
  Modal,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import Constants from "../services/constant";

function Category() {
  const [values, setValues] = useState({
    name: "",
    img: "",
    loading: false,
    error: "",
    formData: "",
  });
  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = () => {
    getData(Constants.END_POINT.GET_CATEGORY).then((res) => {
      if (res.success) {
        setCategories(res.data);
        setValues({ ...values, formData: new FormData() });
      }
    });
  };
  const funcEnableCategory = (id) => {
    putData(Constants.END_POINT.GET_CATEGORY + id).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getCategoriesList();
      }
    });
  };
  const funcDisableCategory = (id) => {
    deleteData(Constants.END_POINT.GET_CATEGORY + id).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getCategoriesList();
      }
    });
  };

  const { name, loading, error, formData } = values;
  const [Categories, setCategories] = useState();
  const [ShowModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);

  const handleChange = (name) => (event) => {
    const value = name === "img" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const [catid, setcatid] = useState("");

  const rendarCategoryList = () => {
    return Categories.map((category, index) => (
      <tr key={index}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <img src={Constants.BASE_URL + category.img} alt="" width="50px" />
        </td>
        <td>
          <Button
            onClick={() => {
              setShowUpdateModal(true);
              setcatid(category.id);
            }}
            variant="info"
            size="sm"
          >
            Edit
          </Button>
        </td>
        <td>
          <Link
            to={{
              pathname: "/admin/SubCategory",
              state: {
                category_name: category.name,
                category_id: category.id,
              },
            }}
          >
            <Button variant="primary" size="sm">
              Add/View Sub Category
            </Button>
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: "/admin/CategoryProducts",
              state: {
                category_id: category.id,
                category_name: category.name,
              },
            }}
          >
            <Button variant="info" size="sm">
              View Products
            </Button>
          </Link>
        </td>
        <td>
          {category.isDeleted ? (
            <Button
              onClick={() => {
                funcEnableCategory(category.id);
              }}
              variant="success"
              size="sm"
            >
              Enable
            </Button>
          ) : (
            <Button
              onClick={() => {
                funcDisableCategory(category.id);
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
  const addCategoryModal = () => {
    return (
      <div>
        <Modal show={ShowModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("img")}
                  type="file"
                  name="img"
                  accept="image"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("name")}
                  name="name"
                  className="form-control"
                  placeholder="Enter Category Name"
                  value={name}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={createNewCategory}>
              Save New Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const updateCategoryModal = () => {
    return (
      <div>
        <Modal
          show={ShowUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("img")}
                  type="file"
                  name="img"
                  accept="image"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("name")}
                  name="name"
                  className="form-control"
                  placeholder="Enter Category Name"
                  value={name}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={FuncUpdateCategory}>
              Edit Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const FuncUpdateCategory = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postData(Constants.END_POINT.UPDATE_CATEGORY + catid, formData)
      .then((data) => {
        console.log(data);
        if (data.success) {
          setShowUpdateModal(false);
          toast.success(data.message);
          setValues({
            ...values,
            name: "",
            img: "",
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            img: "",
            loading: false,
          });
        }
        getCategoriesList();
      })
      .catch((err) => console.log(err));
  };
  const createNewCategory = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postData(Constants.END_POINT.CREATE_CATEGORY, formData)
      .then((data) => {
        if (data.sucess) {
          handleClose();
          alert(data.message);
          setValues({
            ...values,
            name: "",
            img: "",
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            img: "",
            loading: false,
          });
        }
        getCategoriesList();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {addCategoryModal()}
      {updateCategoryModal()}
      {loading ? <Loader /> : null}
      <ToastContainer autoClose={2000} />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Categories</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    Here is a a list of all categories
                  </p>
                  <Button variant="primary" onClick={handleShow}>
                    Add New Category
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Sub Category</th>
                      <th className="border-0">Products</th>
                      <th className="border-0">Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>{Categories && rendarCategoryList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Category;
