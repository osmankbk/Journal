import React, { useContext } from 'react';
import { Navbar, Nav, Container}  from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Context } from '../Context.js'
import logo from "../pen.svg"

// Header component; displays app's navigations & user's(name) sign in/out forms.
const Header = () => {
    const context = useContext(Context);
    const user  = context.authenticatedUser;
    const { logout } = context.actions;
    
// Returns react navbar
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">
            <img alt="brand logo" src={logo} width="50" height="30"/>
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
              <LinkContainer to="/contact-me">
                <Nav.Link>Contact-Me</Nav.Link>
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