import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, Container}  from 'react-bootstrap'
import { Link, useLocation} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Context } from '../Context.js'
import logo from "../pen.svg"

//This desplays the log user and log in information
const Header = () => {
    const context = useContext(Context);
    const user  = context.cookies?.user;
    const { logout } = context.actions;
    const location = useLocation();
    console.log(location);

      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">
            <img alt="brand logo" src={logo} width="75" height="30"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/journal">
              <Nav.Link>Journal</Nav.Link>
            </LinkContainer>
              <LinkContainer to="/meditations">
                <Nav.Link>Meditations</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {
                user ? <>
                <Navbar.Text>Welcome, { `${user?.firstName }` }</Navbar.Text>
                {/* <LinkContainer></LinkContainer> */}
                <Nav.Link id="signout" as={Link} to="/"  onClick={ logout }>Sign Out</Nav.Link>
                </>
                :
                <>
                <LinkContainer to="/login">
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/signup" >
                <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                </>
              }
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}

export default Header;