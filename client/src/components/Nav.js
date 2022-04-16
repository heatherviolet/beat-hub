import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/beethub.JPG";

export default function Navigate() {
  const [selectedNav, setSelectedNav] = useState("");
  const select = (e) => {
    let target = e.target.text;
    setSelectedNav(target);
  };

  return (
    <Navbar
      variant="dark"
      className="d-flex w-100 justify-content-center py-0"
      id="navbar"
    >
      <Container className="navContainer d-flex justify-content-start">
        <Navbar.Brand as={Link} to="/" className="px-3">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          BeetHub
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/" onClick={select} className={selectedNav === "Home" ? "selectedNav" : ""}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/search" onClick={select} className={selectedNav === "Search" ? "selectedNav" : ""}>
            Search
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" onClick={select} className={selectedNav === "Profile" ? "selectedNav" : ""}>
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
