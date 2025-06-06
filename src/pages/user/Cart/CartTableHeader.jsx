import { Col, Row } from "react-bootstrap";

export default function CartTableHeader() {
  return (
    <Row className="d-none d-md-flex fw-bold border-bottom pb-2 text-center">
      <Col md={2}>Image</Col>
      <Col md={2}>Product</Col>
      <Col md={2}>Quantity</Col>
      <Col md={2}>Unit Price</Col>
      <Col md={1}>Total</Col>
      <Col md={1}></Col>
    </Row>
  );
}
