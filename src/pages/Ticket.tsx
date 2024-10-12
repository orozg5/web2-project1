import { Flex, Divider, Text, Heading, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITicket } from "../interfaces/ITicket";

export const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<ITicket>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/ticket/${id}`);
        const data = await res.json();
        setTicket(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Flex p="16px" mt="48px" pb="64px" direction="column" align="center">
      <Flex mt="16px" direction="column" border="solid white 2px" w="600px" h="300px">
        <Box p="16px">
          <Heading>User Info</Heading>
        </Box>

        <Divider />
      </Flex>

      {ticket && (
        <Flex mt="48px" direction="column" border="solid white 2px" w="600px" h="300px">
          <Box p="16px">
            <Heading>Ticket Info</Heading>
          </Box>

          <Divider />

          <Flex h="full">
            <Box p="16px">
              <Text fontSize="18px" color="purple.lighter">
                Id:
              </Text>
              <Text>{ticket.id}</Text>
              {ticket.created && (
                <>
                  <Text mt="8px" fontSize="18px" color="purple.lighter">
                    Created:
                  </Text>
                  <Text>{new Date(ticket.created).toLocaleString()}</Text>
                </>
              )}
            </Box>

            <Divider orientation="vertical" variant="dashed" />

            <Box p="16px">
              <Text fontSize="18px" color="purple.lighter">
                Vatin (OIB):
              </Text>
              <Text>{ticket?.vatin}</Text>
              <Text mt="8px" fontSize="18px" color="purple.lighter">
                First Name:
              </Text>
              <Text>{ticket?.firstName}</Text>
              <Text mt="8px" fontSize="18px" color="purple.lighter">
                Last Name:
              </Text>
              <Text>{ticket?.lastName}</Text>
            </Box>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
