import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import NavBar from "src/components/NavBar";
import Wrapper from "src/components/Wrapper";
import { createUrqlClient } from "src/utils/createUrqlClient";

const Challenges = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Text variant="h1" m="auto" align="center">
          Challenges
        </Text>
        <Flex align="center">
          <Button variant="secondary">
            <FiFilter style={{ marginRight: "5px" }} /> Filter
          </Button>
          <NextLink href="/create-project" passHref>
            <Button variant="primary" ml="auto">
              <BsPencilSquare style={{ marginRight: "5px" }} />
              Create Challenge
            </Button>
          </NextLink>
        </Flex>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Challenges);
