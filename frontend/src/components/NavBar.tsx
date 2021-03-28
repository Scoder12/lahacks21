import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useMeQuery } from "src/generated/graphql";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  const [{ data, fetching }] = useMeQuery();
  const homePage = !data?.me ? "/" : "/projects";
  let body = null;

  if (data?.me) {
    // User is logged in
    body = (
      <Flex flex="2" justifyContent="space-between" ml="50px">
        <Box mt="5px">
          <NextLink href="/challenges" passHref>
            <Link mr="30px" href="#">
              Challenges
            </Link>
          </NextLink>
          <NextLink href="/projects" passHref>
            <Link href="#">Projects</Link>
          </NextLink>
        </Box>
        <Flex>
          <NextLink href="/profile">
            <Flex mr="1vw" alignItems="center" _hover={{ cursor: "pointer" }}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg"
                alt="Profile"
                h="30px"
                w="30px"
                mr="10px"
                objectFit="cover"
                rounded="50%"
              />
              {data.me.username}
            </Flex>
          </NextLink>
          <NextLink href="/logout" passHref>
            <Button variant="secondary" mr="1vw">
              <Link href="#">Logout</Link>
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    );
  } else {
    // User not logged in
    body = (
      <Box ml="auto">
        <NextLink href="/login" passHref>
          <Button size="sm" variant="secondary" mr="1vw">
            Login
          </Button>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button size="sm" variant="primary" mr="1vw">
            Register
          </Button>
        </NextLink>
      </Box>
    );
  }

  return (
    <Flex w="100%" align="center" bg="#000">
      <NextLink href={homePage} passHref>
        <Flex align="center" ml="1vw" _hover={{ cursor: "pointer" }}>
          <Image src={"/logo.svg"} alt="Innopact Logo" height="60px" />
          {!fetching && !data?.me && <Box fontSize="18pt">Innopact</Box>}
        </Flex>
      </NextLink>
      {body}
    </Flex>
  );
};

export default NavBar;
