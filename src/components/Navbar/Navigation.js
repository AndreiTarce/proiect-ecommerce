import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import LoginButton from "../LoginButton";
// import logoWhite from "../../assets/logo_white.png";

const Navigation = () => {
    return (
        <BootstrapNavbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <BootstrapNavbar.Brand href="/">{/* <img src={logoWhite} height={30} /> */}</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Shop</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/cart" className="me-2">
                            Cart
                        </Nav.Link>
                        <LoginButton />
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navigation;
