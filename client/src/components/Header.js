import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../img/logo.svg";

const Header = () => {
    
    return (
        <>
            <Navbar
                variant="dark"
                className="shadow-lg navbar"
            >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            height="50"
                            width="100"
                            alt="logo"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
