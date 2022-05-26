import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";

import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import Constants from "../services/constant";

function SubCategories() {
  const location = useLocation();
  const Category_id = location.state?.category_id;
  const Category_name = location.state?.category_name;

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
  });
  useEffect(() => {
    getSubCategoriesList(Category_id);
  }, []);

  const getSubCategoriesList = (id) => {
    getData(Constants.END_POINT.SUB_CATEGORY + id).then((res) => {
      if (res.success) {
        setCategories(res.data);
        setValues({ ...values, formData: new FormData() });
      }
    });
  };
  const funcEnableCategory = (id) => {
    putData(Constants.END_POINT.SUB_CATEGORY + id).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getSubCategoriesList(Category_id);
      }
    });
  };
  const funcDisableCategory = (id) => {
    deleteData(Constants.END_POINT.SUB_CATEGORY + id).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getSubCategoriesList(Category_id);
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
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const [subCatId, setsubCatId] = useState("");

  const rendarSubCategoryList = () => {
    return Categories.map((category, index) => (
      <tr key={index}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <Button
            onClick={() => {
              setShowUpdateModal(true);
              setsubCatId(category.id);
            }}
            variant="info"
            size="sm"
          >
            Edit
          </Button>
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
            <Button variant="success" onClick={createNewSubCategory}>
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
            <Button variant="success" onClick={FuncUpdateSubCategory}>
              Edit Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const FuncUpdateSubCategory = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postData(Constants.END_POINT.SUB_CATEGORY + subCatId, { name })
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
        getSubCategoriesList(Category_id);
      })
      .catch((err) => console.log(err));
  };
  const createNewSubCategory = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postData(Constants.END_POINT.SUB_CATEGORY, {
      name,
      category_id: Category_id,
    })
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
        getSubCategoriesList(Category_id);
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
                <Card.Title as="h4">{Category_name}</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    Here is a a list of sub-categories
                  </p>
                  <Button variant="primary" onClick={handleShow}>
                    Add New Sub Category
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>{Categories && rendarSubCategoryList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SubCategories;
