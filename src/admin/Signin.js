import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import logo from "../assets/img/Logo.png";
import { Redirect } from "react-router-dom";
import { postData } from "../services/http.service";
import { authenticate, isAuthenticated } from "../services/auth";
import Constants from "../services/constant";

export default function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    message: "",
  });
  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    postData(Constants.END_POINT.SIGIN, { email, password })
      .then((response) => {
        console.log(response);
        if (response.error) {
          setValues({ ...values, error: response.message, loading: false });
        } else {
          authenticate(response, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => {
        console.log("signin request failed==>", error);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated()) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h5 className="mb-0">Loading...</h5>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12  text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <form className="mb-3">
        <div className="mb-3">
          <label for="email" className="form-label">Email or Username</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChange("email")}
            placeholder="Enter Your Email"
            autofocus
          />
        </div>
        <div className="mb-3 form-password-toggle">
          <div className="input-group input-group-merge">
            <input
              value={password}
              onChange={handleChange("password")}
              className="form-control"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary d-grid w-100" type="submit"  onClick={onSubmit}>Sign in</button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <img src={logo} alt="" width="100px" />
              </div>
              <h4 className="mb-2">Welcome to Just Friend! 👋</h4>
              {loadingMessage()}
              {errorMessage()}
              {signInForm()}
              {performRedirect()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}