import React from 'react';

import { NavBar, Container, Button, Nav, Navbar, NavbarBrand, Form, FormControl } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

import { Link } from 'react-router-dom';

export function NavBar() {
    const user = localStorage.getItem('user');

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    return (
        <Navbar className='Navbar'>
            <Container>
                <Link to={'/'}>
                    <NavbarBrand>
                        <img alt='MyFlix Logo' />
                    </NavbarBrand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href={'/users/${user}'}>My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button className="button" type="button" onClick={() => this.onLoggedOut()}>
                    Logout
                </Button>
            </Container>
        </Navbar>
    )
}