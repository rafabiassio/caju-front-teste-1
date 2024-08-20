import { InputHTMLAttributes } from "react";
import { StyledInput, TextFieldError } from "./styles";

type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <StyledInput {...props} />
      <TextFieldError>{props.error}</TextFieldError>
    </div>
  );
};

export default TextField;
