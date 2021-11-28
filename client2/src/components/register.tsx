import React from "react";
import { Container } from "reactstrap";
import CardComponent from "../components/CardComponent";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const history = useHistory();
  const [data, setData] = React.useState<State>({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitRegisterForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:5000/auth/register",
      data
    );
    console.log(response.data);
    if (response.data.registered) {
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
  const inheritUserName = generateInformation(
    "username",
    "UserName",
    "text",
    data.username,
    handleChange
  );
  return (
    <Container>
      <CardComponent
        cardText="Register User..."
        buttonText="register"
        inheritUserName={inheritUserName}
        inheritEmail={inheritEmail}
        inheritPassword={inheritPassword}
        submitRegisterForm={submitRegisterForm}
      />
    </Container>
  );
};

export default Register;
