import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface Props {
  htmlFor: string;
  type: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler;
  label: string;
}

const FormGroupComponent = (props: Props) => {
  return (
    <FormGroup>
      <Label htmlFor={props.htmlFor}>{props.label} : </Label>
      <Input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </FormGroup>
  );
};

export default FormGroupComponent;
