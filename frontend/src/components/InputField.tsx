import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC, InputHTMLAttributes, PropsWithChildren } from "react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
  chakraProps?: InputProps;
};

export const InputField: FC<InputFieldProps> = ({
  label,
  children,
  textarea,
  size: _,
  chakraProps = {},
  ...props
}: PropsWithChildren<InputFieldProps>) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl my="10px" isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputGroup size="md">
        <Input {...field} {...props} {...chakraProps} id={field.name} />
        {children}
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
