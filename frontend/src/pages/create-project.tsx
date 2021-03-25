import { Button, Select, Text, useTheme } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import InputField, { TextareaField } from "src/components/InputField";
import Wrapper from "src/components/Wrapper";
import { useCategoriesQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function CreateProject() {
  //const router = useRouter();
  const [{ data: categoryData, fetching }] = useCategoriesQuery();
  const theme = useTheme();

  console.log(theme, fetching, categoryData);

  // TODO: Show "Login" header here and add a link to register
  return (
    <Wrapper small={true}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="The title of your project"
              label="Title"
            />
            <TextareaField
              name="text"
              placeholder="Give your project a description"
              label="Content"
            />
            {categoryData ? (
              <Select>
                {categoryData.categories.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </Select>
            ) : (
              <Text>Categories Loading...</Text>
            )}
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              mt="4"
              width="100%"
              type="submit"
              // Can't submit until categories are ready
              disabled={fetching}
            >
              Create Project
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(CreateProject);
