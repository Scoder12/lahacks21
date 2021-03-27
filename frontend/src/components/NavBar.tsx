import { Box, Button, Flex, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { useLogoutMutation, useMeQuery } from "src/generated/graphql";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
    // Fetching
  } else if (data?.me) {
    // User is logged in
    body = (
      <Flex align="center">
        <Box mr={10}>{data.me.username}</Box>
        <Button
          as="a"
          mr={5}
          w={110}
          variant="outline"
          _hover={{ bg: "brand.300", border: "none" }}
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  } else {
    // User not logged in
    body = (
      <Box>
        <NextLink href="/login" passHref>
          <Button
            as="a"
            mr={5}
            w={110}
            variant="outline"
            _hover={{ bg: "brand.300", border: "none", textDecor: "none" }}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button
            as="a"
            bg="brand.100"
            mr={10}
            w={110}
            _hover={{ bg: "brand.300", textDecor: "none" }}
          >
            Register
          </Button>
        </NextLink>
      </Box>
    );
  }

  return (
    <Flex justify="space-between" align="center">
      <NextLink href="/" passHref>
        <Flex align="center" ml={10} _hover={{ cursor: "pointer" }}>
          <Image src={"/logo.svg"} alt="Innopact Logo" height="5em" />
          <Box fontSize="20pt">Innopact</Box>
        </Flex>
      </NextLink>
      {body}
    </Flex>
  );
};

export default NavBar;
