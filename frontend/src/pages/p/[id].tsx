import { Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import Markdown from "src/components/Markdown";
import NavBar from "src/components/NavBar";
import Skeletons from "src/components/Skeletons";
import Wrapper from "src/components/Wrapper";
import { useProjectQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

const useGetIndId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  console.log({ query: router.query, intId });

  return isNaN(intId) ? -1 : intId;
};

const useGetPostFromUrl = () => {
  const id = useGetIndId();
  console.log({ id });
  return useProjectQuery({
    pause: id === -1,
    variables: { id },
  });
};

const ProjectPage: FC<{}> = () => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  console.log(data, error, fetching);

  let inner;
  if (fetching) {
    inner = <Skeletons count={5} />;
  } else if (error || !data) {
    inner = <Text>{error ? error.message : "Query failed"}</Text>;
  } else if (!data.project) {
    inner = <Heading>404: Post not found</Heading>;
  } else {
    inner = (
      <>
        <Heading mb={3}>{data.project.title}</Heading>
        <Markdown>{data.project.text}</Markdown>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Wrapper>{inner}</Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectPage);
