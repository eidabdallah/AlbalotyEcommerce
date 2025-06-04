import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaLock } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './../../../pages/auth/AuthModal.jsx';
import { useAuth } from "../../../Context/AuthContext.jsx";

export default function CustomNavbar() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isGuest } = useAuth();
    const logout = () => {
        localStorage.removeItem("userToken");
        navigate("/");
    }
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar expand="lg" className={`${styles.navbarCustom} ${isScrolled ? styles.shrink : ""} shadow-sm sticky-top`}>
                <Container>
                    <Navbar.Brand className={styles.logoWrapper}>
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
                                <Nav.Link
                                    as={Link}
                                    to={isGuest ? "/" : "/user"}
                                    className={`${styles.navLink} fw-bold fs-5 text-white mb-2`}
                                >
                                    HOME
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to={isGuest ? "/products" : "/user/products"}
                                    className={`${styles.navLink} fw-bold fs-5 text-white mb-2`}
                                >
                                    PRODUCTS
                                </Nav.Link>
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
                            <Nav.Link
                                as={Link}
                                to={isGuest ? "/" : "/user"}
                                className={`${styles.navLink} fw-bold fs-5 text-white me-4`}
                            >
                                HOME
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to={isGuest ? "/products" : "/user/products"}
                                className={`${styles.navLink} fw-bold fs-5 text-white me-4`}
                            >
                                PRODUCTS
                            </Nav.Link>
                        </Nav>

                        <div className={`${styles.icons} d-flex align-items-center gap-3`}>
                            <div className={styles.iconItem}>
                                <Link
                                    to={"/user/profile"}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <FaUser />
                                    <span>Profile</span>
                                </Link>
                            </div>

                            <div className={styles.iconItem}>
                                {isGuest ? (
                                    <div
                                        onClick={() => setShowModal(true)}
                                        style={{
                                            cursor: "pointer",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            color: 'inherit',
                                        }}
                                    >
                                        <FaLock />
                                        <span>Account</span>
                                    </div>
                                ) : (
                                    <div
                                        onClick={logout}
                                        style={{
                                            cursor: "pointer",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            color: 'inherit',
                                        }}
                                    >
                                        <FaLock />
                                        <span>Logout</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.iconItem}>
                                <Link
                                    to={"/user/cart"}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                    }}
                                >
                                    <FaShoppingCart />
                                    <span>Cart</span>
                                </Link>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <AuthModal show={showModal} onHide={() => setShowModal(false)} />
        </>
    );
}
