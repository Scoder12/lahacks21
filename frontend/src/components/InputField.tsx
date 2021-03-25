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
import React, {
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from "react";

export type InputFieldProps = {
  name: string;
  label: string;
  chakraProps?: InputProps;
};

// This is not worth haggling with typescript for, anying it out
export const FieldComponent = <T extends Object>(
  C: any
): FC<InputFieldProps & T> => ({
  name,
  label,
  children,
  chakraProps = {},
  ...props
}: PropsWithChildren<InputFieldProps & T>) => {
  const [field, { error }] = useField({ name, ...props });

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

export const InputField = FieldComponent<InputHTMLAttributes<HTMLInputElement>>(
  Input
);

export const TextareaField = FieldComponent<
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(Textarea);

export default InputField;
