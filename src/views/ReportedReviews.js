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

function ReportedReviews() {
  useEffect(() => {
    getReportedReviewsList();
  }, []);
  const [Users, setReviews] = useState();
  const [loading, setLoading] = useState(false);

  const getReportedReviewsList = () => {
    setLoading(true);
    getData(Constants.END_POINT.REPORTED_REVIEWS)
      .then((res) => {
        if (res.success) {
          setReviews(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const deleteReview = (review_id, state) => {
    deleteData(Constants.END_POINT.REPORTED_REVIEWS + review_id).then((res) => {
      if (res.success) {
        console.log(res);
        getReportedReviewsList();
      }
    });
  };
  const rendarReportedUsersList = () => {
    return Users.map((user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.review}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              deleteReview(user.id);
            }}
          >
            Delete
          </Button>
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
                <Card.Title as="h4">All Reported Reviews</Card.Title>
                <div className="d-flex justify-content-between">
                  <p className="card-category">
                    Here is a a list of all reported Reviews
                  </p>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Review</th>
                      <th className="border-0">Delete</th>
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

export default ReportedReviews;
