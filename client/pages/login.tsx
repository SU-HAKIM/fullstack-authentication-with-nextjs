import { NextPage } from "next";
import React from "react";
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

const Login: NextPage = () => {
  const [data, setData] = React.useState<State>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitLoginForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(data);
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
  console.log(inheritEmail);
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
