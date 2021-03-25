import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  Select,
  SelectProps,
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
  C: any,
  inputGroup: boolean
): FC<InputFieldProps & T> => ({
  name,
  label,
  children,
  chakraProps = {},
  ...props
}: PropsWithChildren<InputFieldProps & T>) => {
  const [field, { error }] = useField({ name, ...props });

  const inner = inputGroup ? (
    <C {...field} {...props} {...chakraProps} id={field.name} />
  ) : (
    <C {...field} {...props} {...chakraProps} id={field.name}>
      {children}
    </C>
  );

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {inputGroup ? <InputGroup size="md">{inner}</InputGroup> : inner}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export const InputField = FieldComponent<InputHTMLAttributes<HTMLInputElement>>(
  Input,
  true
);

export const TextareaField = FieldComponent<
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(Textarea, true);

export const SelectField = FieldComponent<SelectProps>(Select, false);

export default InputField;
