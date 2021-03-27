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
              Inspire. Innovate. Impact.
            </Heading>
            <Text mt={5} mb={2}>
              Join our platform to
            </Text>
            <List>
              <CheckItem>Expand your skillset</CheckItem>
              <CheckItem>Build your network</CheckItem>
              <CheckItem>Make the world a better place</CheckItem>
            </List>
            <Flex mt={7}>
              <NextLink href="/register" passHref>
                <Button w={110} bg="brand.100" _hover={{ bg: "brand.300" }}>
                  Get Started
                </Button>
              </NextLink>
              <NextLink href="/about" passHref>
                <Button
                  w={110}
                  ml={5}
                  bg="brand.400"
                  color="brand.300"
                  _hover={{ bg: "brand.300", color: "brand.400" }}
                >
                  Learn More
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
