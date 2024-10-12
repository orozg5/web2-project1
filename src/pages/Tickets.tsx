import { useEffect, useState } from "react";
import { ITicket } from "../interfaces/ITicket";
import { Box, Flex, Text } from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

export const Tickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>();

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

    fetchData();
  }, []);

  return (
    <Flex p="16px" mt="48px" pb="64px" gap="32px" justify="center" flexWrap="wrap">
      {tickets?.map((ticket, index) => (
        <Box key={ticket.id} p="8px" border="solid 2px" borderColor="purple.light" borderRadius="8px">
          <Text mb="8px" textAlign="center">
            Ticket {index + 1}
          </Text>
          <Link to={`http://localhost:5173/tickets/${ticket.id}`}>
            <QRCodeSVG value={`http://localhost:5173/tickets/${ticket.id}`} />
          </Link>
        </Box>
      ))}
    </Flex>
  );
};
