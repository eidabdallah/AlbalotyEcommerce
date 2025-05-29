import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import AuthModal from './../../../pages/auth/AuthModal.jsx';

export default function CustomNavbar() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Navbar expand="lg" className="bg-black shadow-sm sticky-top">
                <Container>
                    <Navbar.Brand>
                        <span className={styles.logoIcon}>Al-Bal</span>
                        <span className={styles.logoMain}>OOO</span>
                        <span className={styles.logoIcon}>tiyeh</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-1 bg-warning text-white">
                        <FiChevronDown size={30} />
                    </Navbar.Toggle>

                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="bg-black text-white d-lg-none"
                    >
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                                <span className={styles.logoIcon}>Al-Bal</span>
                                <span className={styles.logoMain}>OOO</span>
                                <span className={styles.logoIcon}>tiyeh</span>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="d-flex flex-column">
                            <Nav className="flex-column mb-4">
                                <Nav.Link as={Link} to={"/"} className={`${styles.navLink} fw-bold fs-5 text-white mb-2`}>HOME</Nav.Link>
                                <Nav.Link as={Link} to={"/ggg"} className={`${styles.navLink} fw-bold fs-5 text-white mb-2`}>fff</Nav.Link>
                                <Nav.Link className={`${styles.navLink} fw-bold fs-5 text-white mb-2`}>SHOP</Nav.Link>
                                <Nav.Link className={`${styles.navLink} fw-bold fs-5 text-white`}>BLOGS</Nav.Link>
                            </Nav>

                            <div className="d-flex gap-4 justify-content-evenly fs-4">
                                <FaSearch />
                                <FaUser onClick={() => setShowModal(true)} />
                                <FaHeart />
                                <FaShoppingCart />
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    <Navbar.Collapse id="navbar-nav" className="d-none d-lg-flex">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to={"/"} className={`${styles.navLink} fw-bold fs-5 text-white me-4`}>HOME</Nav.Link>
                            <Nav.Link as={Link} to={"/ggg"} className={`${styles.navLink} fw-bold fs-5 text-white me-4`}>fff</Nav.Link>
                            <Nav.Link className={`${styles.navLink} fw-bold fs-5 text-white me-4`}>SHOP</Nav.Link>
                            <Nav.Link className={`${styles.navLink} fw-bold fs-5 text-white`}>BLOGS</Nav.Link>
                        </Nav>

                        <div className={`${styles.icons} d-flex align-items-center gap-3`}>
                            <div className={styles.iconItem}>
                                <FaSearch />
                                <span>Search</span>
                            </div>
                            <div className={styles.iconItem} onClick={() => setShowModal(true)}>
                                <FaUser />
                                <span>Account</span>
                            </div>
                            {/* <div className={styles.iconItem}>
                                <FaHeart />
                                <span>Favorites</span>
                            </div> */}
                            <div className={styles.iconItem}>
                                <FaShoppingCart />
                                <span>Cart</span>
                            </div>
                        </div>


                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <AuthModal show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
}
