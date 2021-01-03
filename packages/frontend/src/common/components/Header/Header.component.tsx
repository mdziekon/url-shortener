import React from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

export const Header = (): React.ReactElement => {
  const i18nStrings = {
    title: {
      label: 'Url Shortener',
    },
    navItems: {
      home: {
        label: 'Home',
      },
    },
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">{i18nStrings.title.label}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">{i18nStrings.navItems.home.label}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
