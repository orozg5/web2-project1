import { Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Flex direction="column" justify="center" align="center" h="100vh" bgColor="zinc.dark" textColor="white">
      <Text fontSize="100px" fontWeight="bold" color="purple.lighter">
        404
      </Text>
      <Text fontSize="24px">Something's missing.</Text>
      <Text m="8px" fontSize="20px">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </Text>
      <Button m="8px">
        <Link to="/">Back to Homepage</Link>
      </Button>
    </Flex>
  );
};
