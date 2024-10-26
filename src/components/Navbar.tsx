import { Button, Flex, Heading } from "@chakra-ui/react";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();

  return (
    <Flex justify="space-between" p="16px" mx="16px">
      <Link to="/">
        <Flex align="center" gap="8px" _hover={{ color: "purple.lighter" }}>
          <IoTicketOutline size="40px" />
          <Heading>Tickets</Heading>
        </Flex>
      </Link>

      {!isAuthenticated ? (
        <Button variant="unstyled" fontSize="18px" onClick={() => loginWithPopup()}>
          Login
        </Button>
      ) : (
        <Button variant="unstyled" fontSize="18px" onClick={() => logout()}>
          Logout
        </Button>
      )}
    </Flex>
  );
};
