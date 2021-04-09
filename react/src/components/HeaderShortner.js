import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

const HeaderShortner = (props) => {
    return (
    <>
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Shortner</Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Links</Nav.Link>
        <Nav.Link href="#pricing">Users</Nav.Link>
        </Nav>
    </Navbar>
    </>
  )
}

export default HeaderShortner;