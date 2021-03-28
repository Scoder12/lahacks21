import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC, PropsWithChildren, TextareaHTMLAttributes } from "react";

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
  chakraProps?: TextareaProps;
};

export const TextareaField: FC<TextareaFieldProps> = ({
  label,
  children,
  textarea,
  chakraProps = {},
  ...props
}: PropsWithChildren<TextareaFieldProps>) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl mb="10px" isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size="md">
        <Textarea {...field} {...props} {...chakraProps} id={field.name} />
        {children}
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default TextareaField;
