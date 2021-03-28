import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
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
      <Image
        src="/hero.png"
        alt="Hero"
        w="100vw"
        h="100vh"
        objectFit="cover"
        position="absolute"
        zIndex="-1"
      />
      <NavBar />
      <Box
        w="100vw"
        h="50px"
        bgGradient="linear(to-b, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))"
      />
      <Flex flexDirection="column" mt="15vh">
        <Flex flex={1} flexDirection="column" justifyContent="space-around">
          <Box
            w="80%"
            mx="auto"
            bg="brand.300"
            p={10}
            rounded="lg"
            opacity="0.8"
          >
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
              <CheckItem>
                Solve problems faced by underrepresented populations
              </CheckItem>
            </List>
            <Flex mt={7}>
              <NextLink href="/register" passHref>
                <Button px={5} variant="primary" mr="1vw">
                  Register
                </Button>
              </NextLink>
              <NextLink href="/projects" passHref>
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
