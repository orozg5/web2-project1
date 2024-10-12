import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Flex justify="space-between" p="16px" mx="16px">
      <Link to="/">
        <Flex align="center" gap="8px" _hover={{ color: "purple.lighter" }}>
          <IoTicketOutline size="40px" />
          <Heading>Tickets</Heading>
        </Flex>
      </Link>

      <Flex align="center" gap="32px" fontSize="18px" mr="100px">
        <Link to="/">
          <Text _hover={{ color: "purple.lighter" }}>Home</Text>
        </Link>
        <Link to="/tickets">
          <Text _hover={{ color: "purple.lighter" }}>Tickets</Text>
        </Link>
      </Flex>

      <Link to="/login">
        <Button variant="unstyled" fontSize="18px">
          Login
        </Button>
      </Link>
    </Flex>
  );
};
