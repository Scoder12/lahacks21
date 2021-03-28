import { Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "src/components/InputField";
import NavBar from "src/components/NavBar";
import SelectField from "src/components/SelectField";
import TextareaField from "src/components/TextareaField";
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
    <>
      <NavBar />
      <Wrapper>
        <Text variant="h1">Create Project</Text>
        <Formik
          initialValues={{ title: "", text: "", categoryId: -1 }}
          onSubmit={async (stringValues, { setErrors }) => {
            // categoryId should be a number
            const categoryId = Number(stringValues.categoryId);
            if (isNaN(categoryId) || categoryId == -1) {
              setErrors({ categoryId: "Invalid category" });
              return;
            }
            const values = { ...stringValues, categoryId };
            console.log(values);

            const { data, error } = await createProject(values);
            if (data?.createProject.errors) {
              setErrors(toErrorMap(data.createProject.errors));
            } else if (error) {
              setErrors({ title: error.message });
            } else {
              router.push("/projects");
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
                chakraProps={{ h: "20rem" }}
              />
              {categoryData ? (
                <SelectField
                  name="categoryId"
                  label="Category"
                  chakraProps={{ mb: "2" }}
                >
                  <option value={-1}>Select a category</option>
                  <option value={1}>Fron-end</option>
                  {categoryData.categories.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </SelectField>
              ) : (
                <Text>Categories Loading...</Text>
              )}
              <Flex justifyContent="space-between">
                <Button
                  isLoading={isSubmitting}
                  variant="primary"
                  size="sm"
                  type="submit"
                  // Can't submit until categories are ready
                  disabled={fetching}
                >
                  Create
                </Button>
                <NextLink href="/projects" passHref>
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(CreateProject);
