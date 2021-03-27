import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useState } from "react";
import { useLogoutMutation, useMeQuery } from "src/generated/graphql";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileDropdownPosition, setProfileDropdownPosition] = useState({
    center: 0,
    bottom: 0,
  });
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const homePage = !data?.me ? "/" : "/projects";
  let body = null;

  const handleProfileClick = (e: any) => {
    const buttonRect = e.target.getBoundingClientRect();
    const center = (buttonRect.left + buttonRect.right) / 2;
    const bottom = buttonRect.bottom + 15;
    console.log(center);
    setProfileDropdownPosition({ center, bottom });
    setShowProfileDropdown(!showProfileDropdown);
  };

  const profileDropdown = (
    <Flex
      h="200px"
      w="150px"
      display={showProfileDropdown ? "flex" : "none"}
      position="absolute"
      right="5px"
      top={`${profileDropdownPosition.bottom}px`}
      flexDirection="column"
      justifyContent="space-around"
      bg="brand.300"
      // p="20px"
      rounded="5px"
    >
      <NextLink href="/profile">
        <Box>
          <Flex alignItems="center" justifyContent="center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg"
              alt="Profile"
              h="30px"
              w="30px"
              mr="10px"
              objectFit="cover"
              rounded="50%"
            />
            {data?.me?.username}
          </Flex>
          <Text mt="5px" align="center">
            My Profile
          </Text>
        </Box>
      </NextLink>
      <Text as="a" align="center" onClick={() => logout()}>
        Settings
      </Text>
      <Text as="a" align="center" onClick={() => logout()}>
        Logout
      </Text>
    </Flex>
  );

  if (fetching) {
    // Fetching
  } else if (data?.me) {
    // User is logged in
    body = (
      <>
        <Flex
          mr="1vw"
          alignItems="center"
          _hover={{ cursor: "pointer" }}
          onClick={handleProfileClick}
        >
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
        {profileDropdown}
      </>
    );
  } else {
    // User not logged in
    body = (
      <Box>
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
    <Flex justify="space-between" align="center" bg="#000">
      <NextLink href={homePage} passHref>
        <Flex align="center" ml="1vw" _hover={{ cursor: "pointer" }}>
          <Image src={"/logo.svg"} alt="Innopact Logo" height="50px" />
          <Box fontSize="18pt">Innopact</Box>
        </Flex>
      </NextLink>
      {body}
    </Flex>
  );
};

export default NavBar;
