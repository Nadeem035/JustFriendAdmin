
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer class="content-footer footer bg-footer-theme">
        <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div class="mb-2 mb-md-0">
            © {new Date().getFullYear()}
            , made with ❤️ by JustFriend
          </div>
          <div>
            <a href="#pablo" class="footer-link me-4" onClick={(e) => e.preventDefault()}>Home</a>
            <a href="#pablo" class="footer-link me-4" onClick={(e) => e.preventDefault()}>Company</a>
            <a href="#pablo" class="footer-link me-4" onClick={(e) => e.preventDefault()}>Portfolio</a>
            <a href="#pablo" class="footer-link me-4" onClick={(e) => e.preventDefault()}>Blog</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
