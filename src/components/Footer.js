import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Navbar className="footer d-flex justify-content-between " sticky="bottom">
      <span className="text-black-50">©Copyright</span>
      <a href="https://github.com/Priyankavhiremath/share-your-meal_frontend">
        <i className="fab fa-github text-black-50 icon-large"></i>
      </a>
      <Link
        className="text-black-50"
        to="/"
      >
        About Us
      </Link>
    </Navbar>
  );
}

export default Footer;
