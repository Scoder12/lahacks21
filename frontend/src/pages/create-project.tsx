import { Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
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
                chakraProps={{ mb: "2" }}
              />
              {categoryData ? (
                <SelectField
                  name="categoryId"
                  label="Category"
                  chakraProps={{ mb: "2" }}
                >
                  <option value={-1}>Select a category</option>
                  {categoryData.categories.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </SelectField>
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
    </>
  );
}

export default withUrqlClient(createUrqlClient)(CreateProject);
