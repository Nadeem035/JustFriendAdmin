import React, { useState, useEffect } from "react";
import { getData, putData, deleteData } from "../services/http.service";
import Constants from "../services/constant";
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
import { useLocation, Link } from "react-router-dom";
import userDummy from "../assets/img/faces/face-0.jpg";
import Loader from "../components/Loader";

function AllUsers() {
  useEffect(() => {
    getUserList();
  }, []);
  const [Users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getUserList = () => {
    setLoading(true);
    getData(Constants.END_POINT.GET_ALL_USERS)
      .then((res) => {
        if (res.success) {
          setUsers(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const enableDisable = (user_id, state) => {
    if (state) {
      putData(Constants.END_POINT.USER + user_id).then((res) => {
        if (res.success) {
          console.log(res);
          getUserList();
        }
      });
    } else {
      deleteData(Constants.END_POINT.USER + user_id).then((res) => {
        if (res.success) {
          console.log(res);
          getUserList();
        }
      });
    }
  };
  const rendarUsersList = () => {
    return Users.map((user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {user?.userImg ? (
            <img
              src={
                user?.userImg.includes("http")
                  ? user?.userImg
                  : Constants.BASE_URL + user?.userImg
              }
              alt=""
              width="50px"
            />
          ) : (
            <img src={userDummy} alt="" width="50px" />
          )}
        </td>
        <td>
          <Link
            to={{
              pathname: "/admin/UserProfile",
              state: {
                user_id: user.id,
              },
            }}
          >
            <Button variant="success" size="sm">
              View
            </Button>
          </Link>
        </td>

        <td>
          {user.isDeleted ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                enableDisable(user.id, user.isDeleted);
              }}
            >
              Enable
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                enableDisable(user.id, user.isDeleted);
              }}
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
      <Container fluid>
        {loading ? <Loader /> : null}
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">All Users</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">Here is a a list of all Users</p>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">View</th>
                      <th className="border-0">Enable/Disable</th>
                    </tr>
                  </thead>
                  <tbody>{Users && rendarUsersList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllUsers;
