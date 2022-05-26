import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Table,
  Col,
} from "react-bootstrap";
import Loader from "../components/Loader";

import {
  getData,
  postData,
  putData,
  deleteData,
} from "../services/http.service";
import { useLocation, Link } from "react-router-dom";
import Constants from "../services/constant";

export default function Payments() {
  const [loading, setLoading] = useState(false);
  const [Payments, setPayments] = useState([]);
  useEffect(() => {
    setLoading(true);
    getData(Constants.END_POINT.PAYMENT).then((res) => {
      if (res.success) {
        setPayments(res.data);
        setLoading(false);
      }
    });
  }, []);
  console.log(Payments);

  const renderPaymentsList = () => {
    return Payments.map((payment, index) => (
      <tr key={index}>
        <td>{payment.id}</td>
        <td>{payment.seller_name}</td>
        <td>
          {" "}
          <Link
            to={{
              pathname: "/admin/ProductDetails",
              state: {
                product_id: payment.product_id,
              },
            }}
          >
            {payment.product_name}
          </Link>
        </td>
        {/* <td>{payment.product_price}</td> */}
        <td>{payment.foundation_name}</td>
        <td>{payment.charity_amt}</td>
        <td>{payment.amount}</td>
        {/* <td>{payment.createdDtm.slice(0, 10)}</td> */}
        <td>
          <Link
            to={{
              pathname: "/admin/UserProfile",
              state: {
                user_id: payment.user_id,
              },
            }}
          >
            <Button variant="warning " size="sm">
              View Buyer
            </Button>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <>
        {loading ? <Loader /> : null}
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Product Payments</Card.Title>
                  <div className="d-flex justify-content-between">
                    <p className="card-category">
                      Here is a a list of all Transactions
                    </p>
                  </div>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Seller Name</th>
                        <th className="border-0">Product Name</th>
                        {/* <th className="border-0">Product Price</th> */}
                        <th className="border-0">Charity Name</th>
                        <th className="border-0">Charity Amount</th>
                        <th className="border-0">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>{Payments && renderPaymentsList()}</tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </div>
  );
}
