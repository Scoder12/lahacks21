import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { FaSchool } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import NavBar from "src/components/NavBar";
import Skeletons from "src/components/Skeletons";
import { useBioQuery } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

const Profile = () => {
  const [{ data, error, fetching }] = useBioQuery();

  if (fetching) {
    return <Skeletons count={5} />;
  } else if (error) {
    return <Text>{error.message}</Text>;
  } else if (!data || !data.me) {
    return <Text>Error: Invalid data received from server</Text>;
  }

  const { firstName, lastName, username, school, location, bio } = data.me;

  return (
    <>
      <NavBar />
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg"
        alt="Profile"
        w="15rem"
        h="15rem"
        objectFit="cover"
        rounded="50%"
        margin="10vh auto 1vh"
      />
      <Text variant="h1">{`${firstName} ${lastName}`}</Text>
      <Text textAlign="center" color="brand.100" fontSize="20px">
        @{username}
      </Text>
      <Text w="600px" m="10px auto 0" color="#aaa">
        {bio}
      </Text>
      <Flex w="500px" justify="space-between" m="20px auto">
        <Flex align="center">
          <FaSchool />
          <Text ml="5px">{school}</Text>
        </Flex>
        <Flex align="center">
          <MdLocationOn />
          <Text ml="3px">{location}</Text>
        </Flex>
      </Flex>
      <NextLink href="edit-profile" passHref>
        <Button variant="primary" size="sm" m="auto" display="block">
          Edit
        </Button>
      </NextLink>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Profile);
