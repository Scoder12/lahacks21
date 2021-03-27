import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { FC, useState } from "react";
import Wrapper from "src/components/Wrapper";
import { useProjectsQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { useRequireLogin } from "src/utils/useRequireLogin";

interface SkeletonsProps {
  count?: number;
}

const Skeletons: FC<SkeletonsProps> = ({ count = 3 }: SkeletonsProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
};

function LatestProjects() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [{ data, fetching }] = useProjectsQuery({
    variables: { limit: 1, cursor },
  });

  if (fetching) {
    return <Skeletons count={5} />;
  }
  if (!data || !data.projects) {
    return <Text>Query error ocurred</Text>;
  }

  return (
    <>
      <Stack>
        {data.projects.map((i) => (
          <Box key={i.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{i.title}</Heading>
            <Text mt={4} display="inline">
              {i.snippet.content}
              {i.snippet.isTrimmed ? "..." : ""}
            </Text>
            {/* TODO: Add large post viewing page */}
            {i.snippet.isTrimmed ? (
              <Link ml={2} color="teal.500" href="#">
                Read more
              </Link>
            ) : null}
          </Box>
        ))}
      </Stack>
      <Button
        onClick={() => {
          setCursor(
            data.projects[data.projects.length - 1].createdAt.toString()
          );
        }}
        isLoading={fetching}
        m="auto"
        my={8}
      >
        Load more
      </Button>
    </>
  );
}

function Home() {
  useRequireLogin();

  return (
    <Wrapper>
      <Flex align="center">
        <Heading mb={4}>Latest Projects</Heading>
        <NextLink href="/create-project" passHref>
          <Link ml="auto">Create a new project</Link>
        </NextLink>
      </Flex>
      <LatestProjects />
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Home);
