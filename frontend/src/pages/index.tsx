import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { FC, PropsWithChildren } from "react";
import NavBar from "src/components/NavBar";
import { createUrqlClient } from "src/utils/createUrqlClient";

function CheckItem({ children }: PropsWithChildren<{}>) {
  return (
    <ListItem fontSize="lg" fontWeight="bold">
      <ListIcon as={CheckIcon} />
      {children}
    </ListItem>
  );
}

export interface IndexProps {}

export const Index: FC<IndexProps> = ({}: IndexProps) => {
  return (
    <>
      <NavBar />
      <Flex flexDirection="column">
        <Flex flex={1} flexDirection="column" justifyContent="space-around">
          <Box w="80%" mt={20} mx="auto" bg="brand.300" p={10} rounded="lg">
            <Heading size="2xl" fontWeight="light" mb={3}>
              Supercharge your résumé
            </Heading>
            <Text fontSize="2xl" mt={5} mb={2}>
              Innopact is a crowd-sourced platform to connect programmers with
              project ideas
            </Text>
            <List>
              <CheckItem>Sharpen your skills</CheckItem>
              <CheckItem>Demonstrate your ability</CheckItem>
              <CheckItem>Share your ideas with the world</CheckItem>
            </List>
            <Flex mt={7}>
              <NextLink href="/register" passHref>
                <Button px={5} variant="primary" mr="1vw">
                  Register
                </Button>
              </NextLink>
              <NextLink href="/about" passHref>
                <Button px={5} variant="secondary">
                  View projects
                </Button>
              </NextLink>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
