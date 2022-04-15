import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import logo from "../assets/images/beethub.JPG"

export default function Navigate() {
  return (
    <Navbar bg="dark" variant="dark" className="d-flex w-100 justify-content-start">
    <Container className="d-flex justify-content-start mx-0">
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      BeetHub
      </Navbar.Brand>
      <Nav className="">
        <Nav.Link className="">Home</Nav.Link>
        <Nav.Link className="">Search</Nav.Link>
        <Nav.Link className="">Profile</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}
