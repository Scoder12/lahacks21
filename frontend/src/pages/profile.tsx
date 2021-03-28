import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "src/components/InputField";
import NavBar from "src/components/NavBar";
import { createUrqlClient } from "src/utils/createUrqlClient";

const Profile = () => {
  const router = useRouter();
  const handleSubmit = async (values: any, { setErrors }: any) => {
    console.log(values);
    router.push("/projects");
  };

  return (
    <>
      <NavBar />
      <Box w="800px" maxW="90%" m="auto" mt="5vh">
        <Text variant="h1" mb={4}>
          Customize Your Profile
        </Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            school: "",
            location: "",
          }}
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
                      name="school"
                      placeholder="School"
                    />
                    <InputField
                      type="text"
                      name="location"
                      placeholder="Location"
                    />
                  </Grid>
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
                variant="primary"
                display="block"
                margin="1rem auto"
                type="submit"
                isLoading={isSubmitting}
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

export default withUrqlClient(createUrqlClient)(Profile);
