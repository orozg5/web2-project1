import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Box>
      <Heading>404</Heading>
      <Text>Something's missing.</Text>
      <Text>Sorry, we can't find that page. You'll find lots to explore on the home page.</Text>
      <Button>
        <Link to="/">Back to Homepage</Link>
      </Button>
    </Box>
  );
};
