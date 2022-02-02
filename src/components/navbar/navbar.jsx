import React from 'react';

import { NavBar, Container, Button, Nav, Navbar, NavbarBrand, Form, FormControl, NavbarCollapse, NavbarToggle } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function Navbar ({ user }) {
    // const user = localStorage.getItem('user');

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className='Navbar'>
            <Container>
                <Link to={'/'}>
                    <NavbarBrand>
                        <img alt='MyFlix Logo' />
                    </NavbarBrand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        {isAuth() && (
                            <Nav.Link href={'/users/{user}'}>My Profile</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {isAuth() && (
                    <Button className="button" type="button" onClick={() => this.onLoggedOut()}>
                        Logout
                    </Button>
                )}
                {!isAuth() && (
                    <Button className='button' href='/'>
                        Login
                    </Button>
                )}
                {!isAuth() && (
                    <Button className='button' href='/register'>
                        Register
                    </Button>
                )}
            </Container>
        </Navbar>
    )
}