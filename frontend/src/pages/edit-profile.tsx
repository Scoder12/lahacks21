import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "src/components/InputField";
import NavBar from "src/components/NavBar";
import Skeletons from "src/components/Skeletons";
import TextareaField from "src/components/TextareaField";
import Wrapper from "src/components/Wrapper";
import { useBioQuery, useUpdateBioMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { useRequireLogin } from "src/utils/useRequireLogin";

const noTypename = (o: Record<string, any>): Record<string, any> => {
  delete o.id;
  delete o.__typename;
  delete o.username;
  return o;
};

const UpdateProfileForm = ({
  data,
}: {
  data: {
    firstName: string;
    lastName: string;
    school: string;
    location: string;
    bio: string;
  };
}) => {
  const [, updateBio] = useUpdateBioMutation();
  const router = useRouter();
  const handleSubmit = async (values: any, { setErrors }: any) => {
    console.log(values);
    // hack
    const { error } = await updateBio({ input: noTypename(values) as any });

    if (error) {
      console.log(error.message);
      setErrors({ firstName: error.message });
      return;
    }

    router.push("/projects");
  };

  return (
    <>
      <Box w="800px" maxW="90%" m="auto" mt="5vh">
        <Text variant="h1" mb={4}>
          Customize Your Profile
        </Text>
        <Formik initialValues={data} onSubmit={handleSubmit}>
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
                  <TextareaField name="bio" label="Bio" placeholder="Bio" />
                  <InputField
                    type="text"
                    name="link"
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
                    name="imgUrl"
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

const EditProfile = () => {
  useRequireLogin();
  const [{ data, error, fetching }] = useBioQuery();

  let inner;
  if (fetching) {
    inner = <Skeletons count={5} />;
  } else if (error) {
    inner = <Text>{error.message}</Text>;
  } else if (!data || !data.me) {
    inner = <Text>Error: Invalid data received from server</Text>;
  } else {
    inner = <UpdateProfileForm data={data.me} />;
  }

  return (
    <>
      <NavBar />
      <Wrapper>{inner}</Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(EditProfile);
