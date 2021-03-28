import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import NavBar from "src/components/NavBar";
import Skeletons from "src/components/Skeletons";
import Wrapper from "src/components/Wrapper";
import { useProjectsQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function LatestProjects() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [{ data, fetching }] = useProjectsQuery({
    variables: { limit: 10, cursor },
  });
  console.log(data);

  if (fetching) {
    return <Skeletons count={5} />;
  }
  if (!data || !data.projects) {
    return <Text>Query error ocurred</Text>;
  }

  return (
    <>
      <Stack>
        {data.projects.projects.map((i) => (
          <Box key={i.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{i.title}</Heading>
            <Text mt={4} display="inline">
              {i.snippet.content}
              {i.snippet.isTrimmed ? "..." : ""}
            </Text>
            {/* TODO: Add large post viewing page */}
            {i.snippet.isTrimmed ? (
              <Link ml={2} href="#">
                Read more
              </Link>
            ) : null}
          </Box>
        ))}
      </Stack>
      {data.projects.hasMore ? (
        <Button
          onClick={() => {
            setCursor(
              data.projects.projects[
                data.projects.projects.length - 1
              ].createdAt.toString()
            );
          }}
          isLoading={fetching}
          m="auto"
          my={8}
        >
          Load more
        </Button>
      ) : null}
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Text variant="h1" m="auto" align="center">
          Latest Projects
        </Text>
        <Flex align="center">
          <Button variant="secondary">
            <FiFilter style={{ marginRight: "5px" }} /> Filter
          </Button>
          <NextLink href="/create-project" passHref>
            <Button variant="primary" ml="auto">
              <BsPencilSquare style={{ marginRight: "5px" }} />
              Create Project
            </Button>
          </NextLink>
        </Flex>
        <LatestProjects />
      </Wrapper>
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(ProjectsPage);
