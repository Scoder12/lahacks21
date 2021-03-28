import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useMeQuery } from "src/generated/graphql";

export interface NavBarProps {}

export const NavBar: FC<NavBarProps> = ({}: NavBarProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileDropdownPosition, setProfileDropdownPosition] = useState({
    center: 0,
    bottom: 0,
  });
  const [{ data, fetching }] = useMeQuery();
  const homePage = !data?.me ? "/" : "/projects";
  let body = null;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: any) => {
    if (dropdownRef?.current?.contains(e.target)) {
      return;
    }
    setShowProfileDropdown(false);
  };

  const handleProfileClick = (e: any) => {
    const buttonRect = e.target.getBoundingClientRect();
    const center = (buttonRect.left + buttonRect.right) / 2;
    const bottom = buttonRect.bottom + 20;
    setProfileDropdownPosition({ center, bottom });
    setShowProfileDropdown(!showProfileDropdown);
  };

  const profileDropdown = (
    <Flex
      p={5}
      display={showProfileDropdown ? "flex" : "none"}
      position="absolute"
      right="5px"
      top={`${profileDropdownPosition.bottom}px`}
      flexDirection="column"
      justifyContent="space-around"
      bg="brand.500"
      rounded="5px"
      ref={dropdownRef}
    >
      <NextLink href="/profile" passHref>
        <Link href="#">Profile</Link>
      </NextLink>
      <NextLink href="/logout" passHref>
        <Link href="#">Logout</Link>
      </NextLink>
    </Flex>
  );

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
