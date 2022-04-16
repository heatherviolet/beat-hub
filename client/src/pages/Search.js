import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Search() {
  return (
    <Form className="form">
      <Form.Group className="searchForm mb-3" controlId="formBasicSearch">
        <Form.Label>Search</Form.Label>
        <Form.Control type="text" placeholder="Search..." />
        <Button variant="secondary" type="submit" className="button py-2 my-3">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
