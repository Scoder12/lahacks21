import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { FC, useState } from "react";
import InputField from "src/components/InputField";
import NavBar from "src/components/NavBar";
import { useRegisterMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { toErrorMap } from "src/utils/toErrorMap";

export interface RegisterProps {}

export const Register: FC<RegisterProps> = ({}: RegisterProps) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <>
      <NavBar />
      <Box w="500px" m="auto" mt="10%">
        <Text mb={4} fontSize="3xl" fontWeight="bold" align="center">
          Join Innopact
        </Text>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await register({ options: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/profile");
            } else {
              setErrors({ username: "Unexpected response from server" });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField type="email" name="email" placeholder="Email" />
              <Box mt="4">
                <InputField name="username" placeholder="Username" />
              </Box>
              <Box mt="4">
                <InputField
                  name="password"
                  placeholder="Password"
                  type={passwordShown ? "text" : "password"}
                  chakraProps={{ pr: "1.5rem" }}
                >
                  <InputRightElement width="1.5rem">
                    <IconButton
                      aria-label={
                        passwordShown ? "Hide password" : "Show password"
                      }
                      icon={passwordShown ? <ViewOffIcon /> : <ViewIcon />}
                      h="1.75rem"
                      size="xs"
                      onClick={() => setPasswordShown((v) => !v)}
                    />
                  </InputRightElement>
                </InputField>
              </Box>
              <Button
                bg="brand.100"
                isLoading={isSubmitting}
                my="4"
                width="100%"
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Text align="center">
          Already have an account?{" "}
          <NextLink href="/login" passHref>
            <Button color="brand.100" variant="link">
              Login
            </Button>
          </NextLink>
        </Text>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
