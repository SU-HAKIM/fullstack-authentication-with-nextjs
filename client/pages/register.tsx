import { NextPage } from "next";
import React from "react";
import { Container } from "reactstrap";
import CardComponent from "../components/CardComponent";

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

const Register: NextPage = () => {
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
    console.log(data);
    let response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let tokens = await response.json();
    console.log(tokens);
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
