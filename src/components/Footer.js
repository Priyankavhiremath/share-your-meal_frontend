import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
//import { faGithub } from "@fontawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Navbar
      className="footer d-flex justify-content-between "
      sticky="bottom"
      position="absolute"
    >
      <span className="text-black-50">┬ęCopyright</span>
      <a href="https://github.com/Priyankavhiremath/share-your-meal_frontend">
        <i class="fab fa-github text-black-50 icon-large"></i>
      </a>
      <Link className="text-black-50" to="/AboutUs">
        About Us
      </Link>
    </Navbar>
  );
}

export default Footer;
