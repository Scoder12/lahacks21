import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Image,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
      <Box w="400px" m="auto" mt="5%">
        <NextLink href="/" passHref>
          <Image
            src="logo.svg"
            alt="Innopact"
            m="auto"
            w="7rem"
            _hover={{ cursor: "pointer" }}
          />
        </NextLink>
        <Text mb={4} fontSize="3xl" fontWeight="400" align="center">
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
                router.push("/projects");
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
                  <InputRightElement width="1.75rem" mr="5px">
                    <IconButton
                      aria-label={
                        passwordShown ? "Hide password" : "Show password"
                      }
                      icon={passwordShown ? <ViewOffIcon /> : <ViewIcon />}
                      h="1.75rem"
                      w="1.75rem"
                      size="xs"
                      bg="brand.100"
                      _hover={{ opacity: "0.5" }}
                      onClick={() => setPasswordShown((v) => !v)}
                    />
                  </InputRightElement>
                </InputField>
              </Box>
              <Button
                size="lg"
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
                my="10px"
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
