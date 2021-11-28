import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import CardComponent from "../components/CardComponent";

interface FormData {
  email: string;
  password?: string;
}

function generateInformation(
  name: string,
  label: string,
  type: string,
  value: string,
  handleChange: React.ChangeEventHandler
) {
  return {
    htmlFor: name,
    label: label,
    type: type,
    name: name,
    value: value,
    handleChange: handleChange,
  };
}

interface State {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const [data, setData] = React.useState<State>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitLoginForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response = await axios.post("http://localhost:5000/auth/login", data);
    console.log(response);
    if (!response.data.error) {
      Cookies.set("rt", response.data.tokens.refreshToken);
      let newResponse = await axios.get("http://localhost:5000/", {
        headers: {
          Authorization: "Bearer " + response.data.tokens.accessToken,
        },
      });
      if (newResponse.data.access) {
        history.push("/");
      }
    }
  };
  const inheritEmail = generateInformation(
    "email",
    "Email",
    "email",
    data.email,
    handleChange
  );
  const inheritPassword = generateInformation(
    "password",
    "Password",
    "password",
    data.password,
    handleChange
  );
  return (
    <Container>
      <CardComponent
        cardText="Login Here..."
        buttonText="login"
        inheritEmail={inheritEmail}
        inheritPassword={inheritPassword}
        submitLoginForm={submitLoginForm}
      />
    </Container>
  );
};

export default Login;
