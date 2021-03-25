import { Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField, {
  SelectField,
  TextareaField,
} from "src/components/InputField";
import Wrapper from "src/components/Wrapper";
import {
  useCategoriesQuery,
  useCreateProjectMutation,
} from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { toErrorMap } from "src/utils/toErrorMap";
import { useRequireLogin } from "src/utils/useRequireLogin";

function CreateProject() {
  useRequireLogin();
  const router = useRouter();
  const [{ data: categoryData, fetching }] = useCategoriesQuery();
  const [, createProject] = useCreateProjectMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ title: "", text: "", categoryId: -1, tags: "" }}
        onSubmit={async (stringValues, { setErrors }) => {
          // categoryId should be a number
          const categoryId = Number(stringValues.categoryId);
          if (isNaN(categoryId)) {
            setErrors({ categoryId: "Invalid category" });
          }
          const values = { ...stringValues, categoryId };
          console.log(values);

          const { data } = await createProject(values);
          if (data?.createProject.errors) {
            setErrors(toErrorMap(data.createProject.errors));
          } else {
            router.push("/home");
          }
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
              chakraProps={{ mb: "2" }}
            />
            {categoryData ? (
              <SelectField
                name="categoryId"
                label="Category"
                chakraProps={{ mb: "2" }}
              >
                {categoryData.categories.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </SelectField>
            ) : (
              <Text>Categories Loading...</Text>
            )}
            <InputField
              label="Tags, separated by commas"
              name="tags"
              placeholder="frontend,react,next.js"
            />
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
