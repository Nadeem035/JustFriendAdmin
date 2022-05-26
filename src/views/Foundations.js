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

function Foundations() {
  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
  });
  useEffect(() => {
    getFoundationsList();
  }, []);

  const getFoundationsList = () => {
    getData(Constants.END_POINT.FOUNDATION + "/all").then((res) => {
      if (res.success) {
        setFoundations(res.data);
        setValues({ ...values, formData: new FormData() });
      }
    });
  };
  const funcEnableFoundation = (id) => {
    putData(Constants.END_POINT.FOUNDATION + id, { isDeleted: 0 }).then(
      (res) => {
        if (res.success) {
          toast.success(res.message);
          getFoundationsList();
        }
      }
    );
  };
  const funcDisableFoundation = (id) => {
    deleteData(Constants.END_POINT.FOUNDATION + id).then((res) => {
      if (res.success) {
        toast.success(res.message);
        getFoundationsList();
      }
    });
  };

  const { name, loading, error } = values;
  const [Foundations, setFoundations] = useState();
  const [ShowModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const [FoundationId, setFoundationId] = useState("");

  const rendarFoundationList = () => {
    return Foundations.map((foundation, index) => (
      <tr key={index}>
        <td>{foundation.id}</td>
        <td>{foundation.name}</td>
        <td>
          <Button
            onClick={() => {
              setShowUpdateModal(true);
              setFoundationId(foundation.id);
            }}
            variant="info"
            size="sm"
          >
            Edit
          </Button>
        </td>
        <td>
          {foundation.isDeleted ? (
            <Button
              onClick={() => {
                funcEnableFoundation(foundation.id);
              }}
              variant="success"
              size="sm"
            >
              Enable
            </Button>
          ) : (
            <Button
              onClick={() => {
                funcDisableFoundation(foundation.id);
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
  const addFoundationModal = () => {
    return (
      <div>
        <Modal show={ShowModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New foundation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("name")}
                  name="name"
                  className="form-control"
                  placeholder="Enter foundation Name"
                  value={name}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={createNewFoundation}>
              Save New Foundation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const updateFoundationModal = () => {
    return (
      <div>
        <Modal
          show={ShowUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Foundation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label className="btn btn-block">
                <input
                  onChange={handleChange("name")}
                  name="name"
                  className="form-control"
                  placeholder="Enter Foundation Name"
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
              Edit Foundation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const FuncUpdateCategory = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    putData(Constants.END_POINT.FOUNDATION + FoundationId, { name })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setShowUpdateModal(false);
          toast.success(data.message);
          setValues({
            ...values,
            name: "",
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
          });
        }
        getFoundationsList();
      })
      .catch((err) => console.log(err));
  };
  const createNewFoundation = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postData(Constants.END_POINT.FOUNDATION, { name })
      .then((data) => {
        if (data.sucess) {
          handleClose();
          alert(data.message);
          setValues({
            ...values,
            name: "",
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
          });
        }
        getFoundationsList();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {addFoundationModal()}
      {updateFoundationModal()}
      {loading ? <Loader /> : null}
      <ToastContainer autoClose={2000} />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Foundations</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    Here is a a list of all Foundations
                  </p>
                  <Button variant="primary" onClick={handleShow}>
                    Add New Foundation
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
                  <tbody>{Foundations && rendarFoundationList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Foundations;
