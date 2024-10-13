import { useEffect, useState } from "react";
import { ITicket } from "../interfaces/ITicket";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Tickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>();
  const { isAuthenticated, loginWithPopup } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/ticket");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <Flex p="16px" mt="48px" pb="64px" gap="32px" justify="center" flexWrap="wrap">
      {isAuthenticated ? (
        tickets?.map((ticket, index) => (
          <Box key={ticket.id} p="8px" border="solid 2px" borderColor="purple.light" borderRadius="8px">
            <Text mb="8px" textAlign="center">
              Ticket {index + 1}
            </Text>
            <Link to={`http://localhost:5173/tickets/${ticket.id}`}>
              <QRCodeSVG value={`http://localhost:5173/tickets/${ticket.id}`} />
            </Link>
          </Box>
        ))
      ) : (
        <Flex direction="column" align="center" gap="16px">
          <Text fontSize="24px">You need to login to see the tickets!</Text>
          <Button onClick={() => loginWithPopup()}>Login</Button>
        </Flex>
      )}
    </Flex>
  );
};
