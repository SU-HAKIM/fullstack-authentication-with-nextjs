import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const history = useHistory();
  const handleDelete = async () => {
    const rt = Cookies.get("rt");
    console.log("clicked");
    const response = await axios.post("http://localhost:5000/auth/logout", {
      refreshToken: rt,
    });
    console.log(response);
    if (response.status === 204) {
      history.push("/login");
    }
  };
  return (
    <Navbar color="dark" expand="md" dark>
      <Link to="/">
        <NavbarBrand>AUTH</NavbarBrand>
      </Link>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/login">
              <NavLink>Login</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/register">
              <NavLink>Register</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <NavLink style={{ cursor: "pointer" }}>
              <button className="btn btn-primary" onClick={handleDelete}>
                Logout
              </button>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
