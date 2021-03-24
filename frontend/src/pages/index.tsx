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
import { FC, PropsWithChildren } from "react";
import { createUrqlClient } from "src/utils/createUrqlClient";

function CheckItem({ children }: PropsWithChildren<{}>) {
  return (
    <ListItem>
      <ListIcon as={CheckIcon} />
      {children}
    </ListItem>
  );
}

export interface IndexProps {}

export const Index: FC<IndexProps> = ({}: IndexProps) => {
  return (
    <>
      {/* Navbar */}
      <Flex justify="space-between">
        <Flex align="center">
          <Image src={"/logo.svg"} alt="Innopact Logo" height="5em" />
          <Box fontSize="20pt">Innopact</Box>
        </Flex>
        <Flex align="center">
          <Button colorScheme="gray" mr={2} px={20}>
            Login
          </Button>
        </Flex>
      </Flex>
      {/* Hero */}
      <Box ml={[0, "5em"]}>
        <Heading size="xl" mb={3}>
          Inspire. Innovate. Impact.
        </Heading>
        <Text mb={2}>Join our platform to</Text>
        <List>
          <CheckItem>Expand your skillset</CheckItem>
          <CheckItem>Build your network</CheckItem>
          <CheckItem>Make the world a better place</CheckItem>
        </List>
        <Flex mt={5}>
          <Button colorScheme="purple">Get Started</Button>
        </Flex>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
