import React from 'react';
import { IUser } from '../models/users';
import { Container, Navbar } from 'react-bootstrap';

interface NavbarProps {
  signInedUser?: IUser | null;
  onSignUpClick: () => void;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export default function NavBar({
  signInedUser,
  onSignInClick,
  onSignUpClick,
  onSignOutClick,
}: NavbarProps) {
  return (
    <Navbar bg="secondary" expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
