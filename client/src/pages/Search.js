import React from 'react'
import { Form, Button } from "react-bootstrap";

export default function Search() {
  return (
    <Form>
        <Form.Group className="searchForm mb-3" controlId="formBasicSearch">
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" placeholder="Search..." />
        </Form.Group>
        <Button variant="secondary" type="submit">
            Submit
        </Button>
    </Form>
  )
}
