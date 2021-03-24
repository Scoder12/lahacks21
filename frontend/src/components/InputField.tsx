import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC, InputHTMLAttributes, PropsWithChildren } from "react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  chakraProps?: InputProps;
  textArea?: boolean;
};

export const InputField: FC<InputFieldProps> = ({
  label,
  children,
  size: _,
  chakraProps = {},
  textArea,
  ...props
}: PropsWithChildren<InputFieldProps>) => {
  const [field, { error }] = useField(props);

  const C = textArea ? Textarea : Input;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size="md">
        <C {...field} {...props} {...chakraProps} id={field.name} />
        {children}
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
