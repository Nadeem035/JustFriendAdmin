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

function ReportedUsers() {
  useEffect(() => {
    getReportedUserList();
  }, []);
  const [Users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getReportedUserList = () => {
    setLoading(true);
    getData(Constants.END_POINT.REPORTED_USERS)
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
          getReportedUserList();
        }
      });
    } else {
      deleteData(Constants.END_POINT.USER + user_id).then((res) => {
        if (res.success) {
          console.log(res);
          getReportedUserList();
        }
      });
    }
  };
  const rendarReportedUsersList = () => {
    return Users.map((user, index) => (
      <tr key={index}>
        {/* <td>{user.reported_user_id}</td> */}
        <td>{user.reported_user_name}</td>
        <td>
          {user?.reported_user_img ? (
            <img
              src={
                user?.reported_user_img.includes("http")
                  ? user?.reported_user_img
                  : Constants.BASE_URL + user?.reported_user_img
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
                user_id: user.reported_user_id,
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
                enableDisable(user.reported_user_id, user.isDeleted);
              }}
            >
              Enable
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                enableDisable(user.reported_user_id, user.isDeleted);
              }}
            >
              Disable
            </Button>
          )}
        </td>
        <td>
          <Link
            to={{
              pathname: "/admin/UserProfile",
              state: {
                user_id: user.reported_by_user,
              },
            }}
          >
            <Button variant="info" size="sm">
              View
            </Button>
          </Link>
        </td>
        <td>{user.type}</td>
        <td>
          <div
            style={{ width: "200px", maxHeight: "50px", overflowY: "scroll" }}
          >
            {" "}
            {user.comment}
          </div>
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
                <Card.Title as="h4">All Reported Users</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    Here is a a list of all reported Users
                  </p>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Reported User</th>
                      <th className="border-0">Enable/Disable</th>
                      <th className="border-0">Report By</th>
                      <th className="border-0">Type</th>
                      <th className="border-0">Comment</th>
                    </tr>
                  </thead>
                  <tbody>{Users && rendarReportedUsersList()}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReportedUsers;
