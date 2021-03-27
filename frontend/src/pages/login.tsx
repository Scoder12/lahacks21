import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { useLoginMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { toErrorMap } from "src/utils/toErrorMap";

export interface LoginProps {}

export const Login: FC<LoginProps> = ({}: LoginProps) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // TODO: Show "Login" header here and add a link to register
  return (
    <>
      <NavBar />
      <Box w="500px" m="auto" mt="10%">
        <Text mb={4} fontSize="3xl" fontWeight="bold" align="center">
          Login to Innopact
        </Text>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string" && router.query.next) {
                router.push(router.query.next);
              } else {
                router.push("/home");
              }
            } else {
              setErrors({ usernameOrEmail: "Unexpected response from server" });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="Username or Email"
              />
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Text align="center">
          Don't have an account?{" "}
          <NextLink href="/register" passHref>
            <Button color="brand.100" variant="link">
              Register
            </Button>
          </NextLink>
        </Text>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
