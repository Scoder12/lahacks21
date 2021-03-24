import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import InputField from "src/components/InputField";
import Wrapper from "src/components/Wrapper";
import { useCategoriesQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function CreateProject() {
  //const router = useRouter();
  const [{ data: categories, fetching }] = useCategoriesQuery();

  console.log(fetching, categories);

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
            <InputField
              name="text"
              placeholder="Give your project a description"
              label="Content"
              textArea
            />
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              mt="4"
              width="100%"
              type="submit"
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
