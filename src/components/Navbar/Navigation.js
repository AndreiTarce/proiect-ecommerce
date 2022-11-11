import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import emag from "../../assets/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContextProvider";
import { signedInState } from "../../atoms/signedInState";
import { useRecoilState } from "recoil";

const Navigation = () => {
    const { user, logOut } = UserAuth();
    const [isSignedIn, setIsSignedIn] = useRecoilState(signedInState);

    const handleSignOut = async () => {
        try {
            await logOut();
            setIsSignedIn(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar bg="primary" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={emag} width="100" height="30" className="d-inline-block align-top"></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#">
                                {user?.displayName ? (
                                    <button onClick={handleSignOut}>Logout</button>
                                ) : (
                                    <Link to="/signin">Sign in</Link>
                                )}
                            </Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                {user?.displayName ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <Link to="/signin">Sign in</Link>
                )}
            </Navbar>
        </>
    );
};

export default Navigation;
