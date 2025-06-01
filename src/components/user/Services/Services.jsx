import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMoneyBillWave, FaTruck, FaHeadset, FaLock } from 'react-icons/fa';
import styles from './Services.module.css';

export default function Services() {
  const services = [
    {
      icon: <FaMoneyBillWave size={40} />,
      title: 'Money Back Guarantee',
      description: '100% refund within 30 days.',
    },
    {
      icon: <FaTruck size={40} />,
      title: 'Free Delivery',
      description: 'Free shipping on orders over $50.',
    },
    {
      icon: <FaHeadset size={40} />,
      title: 'Always Support',
      description: '24/7 customer support available.',
    },
    {
      icon: <FaLock size={40} />,
      title: 'Secure Payment',
      description: 'Safe & secure online payment.',
    },
  ];

  return (
    <div className='my-5'>
      <Container>
        <h2 className={`text-center fw-bold ${styles.title}`}> OUR SERVICES</h2>
        <Row className="text-center g-4">
          {services.map((service, index) => (
            <Col key={index} md={3} sm={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="mb-3 text-warning">
                    {service.icon}
                  </div>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
