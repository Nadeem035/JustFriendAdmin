import React from "react";
import logo from "../assets/admin/img/icons/unicons/chart-success.png";
import ChartistGraph from "react-chartist";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-md-3 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={logo}
                          alt="chart success"
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span>Active Users</span>
                    <h3 class="card-title mb-2">15,654</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={logo}
                          alt="Credit Card"
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span>Active Products</span>
                    <h3 class="card-title text-nowrap mb-2">18,765</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={logo}
                          alt="..."
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span>Categories</span>
                    <h3 class="card-title text-nowrap mb-2">10</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={logo}
                          alt="..."
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span>Followers</span>
                    <h3 class="card-title text-nowrap mb-2">+45K</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
