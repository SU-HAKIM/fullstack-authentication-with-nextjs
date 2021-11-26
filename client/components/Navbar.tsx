import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import Link from "next/link";

const Header = () => {
  return (
    <Navbar color="dark" expand="md" dark>
      <Link href="/" passHref>
        <NavbarBrand>AUTH</NavbarBrand>
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link href="/login" passHref>
              <NavLink>Login</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/register" passHref>
              <NavLink>Register</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => console.log("clicked")}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
