import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { InputProps } from "@chakra-ui/input";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React, { InputHTMLAttributes } from "react";
import InputField from "src/components/InputField";
import NavBar from "src/components/NavBar";
import { useRequireLogin } from "src/utils/useRequireLogin";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  textarea?: boolean;
  chakraProps?: InputProps;
};

const Profile = () => {
  useRequireLogin();

  const handleSubmit = async (values: any, { setErrors }: any) => {
    console.log(values);
  };

  return (
    <>
      <NavBar />
      <Box w="800px" maxW="90%" m="auto" mt="10%">
        <Text mb={4} fontSize="3xl" fontWeight="bold" align="center">
          Customize Your Profile
        </Text>
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex>
                <Flex flex={2} flexDirection="column">
                  <Grid templateColumns="repeat(2, 1fr)" gap="0 10px">
                    <InputField
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <InputField
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <InputField
                      type="text"
                      name="university"
                      placeholder="University"
                    />
                    <InputField
                      type="text"
                      name="degree"
                      placeholder="Degree"
                    />
                    <InputField
                      type="text"
                      name="Occupation"
                      placeholder="Occupation"
                    />
                  </Grid>
                  <InputField
                    type="text"
                    name="country"
                    placeholder="Country"
                  />
                  <InputField type="text" name="skills" placeholder="Skills" />
                  <InputField
                    type="text"
                    name="profileLink"
                    placeholder="Profile Link"
                  />
                </Flex>
                <Flex
                  flex={1}
                  flexDirection="column"
                  justifyContent="space-between"
                  rounded="20px"
                  m="0 20px"
                >
                  <Box w="70%" m="auto" rounded="50%" bg="brand.100" p="10px">
                    <Image src="/user.svg" alt="Profile" />
                  </Box>
                  <InputField
                    type="url"
                    name="profileImgUrl"
                    placeholder="Prophile Photo URL"
                  />
                </Flex>
              </Flex>
              <Button
                bg="brand.100"
                isLoading={isSubmitting}
                my="4"
                display="block"
                margin="1rem auto"
                width={110}
                type="submit"
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Profile;
