import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC, PropsWithChildren, SelectHTMLAttributes } from "react";

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  chakraProps?: SelectProps;
};

export const SelectField: FC<SelectFieldProps> = ({
  label,
  children,
  size: _,
  chakraProps = {},
  ...props
}: PropsWithChildren<SelectFieldProps>) => {
  const [field, { error }] = useField({ ...props, type: "select" });

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} {...chakraProps} id={field.name}>
        {children}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default SelectField;
