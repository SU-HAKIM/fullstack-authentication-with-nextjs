import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const Header = () => {
  const [tokens, setTokens] = React.useState<Tokens>();
  const [show, setShow] = React.useState<boolean | null>(null);
  const history = useHistory();
  const location = useLocation();

  const rt = Cookies.get("rt");
  React.useEffect(() => {
    let getTokens = async () => {
      if (!rt) {
        setShow(true);
        return;
      }

      let response = await axios.post(
        "http://localhost:5000/auth/refresh-token",
        {
          refreshToken: rt,
        }
      );
      if (!response.data.error) {
        Cookies.set("rt", response.data.tokens.refreshToken);
        setTokens(response.data.tokens);
        setShow(false);
      }
    };
    getTokens();
  }, [location, rt]);

  const handleDelete = async () => {
    const rt = Cookies.get("rt");
    console.log("clicked");
    const response = await axios.post("http://localhost:5000/auth/logout", {
      refreshToken: rt,
    });
    console.log(response);
    if (response.status === 204) {
      Cookies.remove("rt");
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
          {!tokens?.accessToken || show ? (
            <>
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
            </>
          ) : (
            ""
          )}
          {tokens?.refreshToken && !show ? (
            <NavItem>
              <NavLink style={{ cursor: "pointer" }}>
                <button className="btn btn-primary" onClick={handleDelete}>
                  Logout
                </button>
              </NavLink>
            </NavItem>
          ) : (
            ""
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
