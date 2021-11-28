import React from "react";
import { Button, Card, CardBody, CardHeader, Form } from "reactstrap";

import FormGroupComponent from "./FormGroup";

interface Inherit {
  htmlFor: string;
  type: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler;
  label: string;
}

interface Props {
  cardText: string;
  buttonText: string;
  inheritUserName?: Inherit;
  inheritEmail?: Inherit;
  inheritPassword?: Inherit;
  submitRegisterForm?: any;
  submitLoginForm?: any;
}

const CardComponent = (props: Props) => {
  return (
    <Card className="w-50 mt-5 mx-auto">
      <CardHeader className="display-4">{props.cardText}</CardHeader>
      <CardBody>
        <Form
          onSubmit={
            props.inheritUserName
              ? props.submitRegisterForm
              : props.submitLoginForm
          }
        >
          {props.inheritUserName && (
            <FormGroupComponent
              htmlFor={props.inheritUserName?.htmlFor as string}
              label={props.inheritUserName?.label as string}
              type={props.inheritUserName?.type as string}
              name={props.inheritUserName?.name as string}
              handleChange={
                props.inheritUserName?.handleChange as React.ChangeEventHandler
              }
              value={props.inheritUserName?.value as string}
            />
          )}
          {props.inheritEmail && (
            <FormGroupComponent
              htmlFor={props.inheritEmail?.htmlFor as string}
              label={props.inheritEmail?.label as string}
              type={props.inheritEmail?.type as string}
              name={props.inheritEmail?.name as string}
              handleChange={
                props.inheritEmail?.handleChange as React.ChangeEventHandler
              }
              value={props.inheritEmail?.value as string}
            />
          )}
          {props.inheritPassword && (
            <FormGroupComponent
              htmlFor={props.inheritPassword?.htmlFor as string}
              label={props.inheritPassword?.label as string}
              type={props.inheritPassword?.type as string}
              name={props.inheritPassword?.name as string}
              handleChange={
                props.inheritPassword?.handleChange as React.ChangeEventHandler
              }
              value={props.inheritPassword?.value as string}
            />
          )}
          <Button type="submit" color="primary">
            {props.buttonText}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
