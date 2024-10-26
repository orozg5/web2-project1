import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ticket from "../styles/lotties/ticket.json";
import Lottie from "react-lottie";
import { ITicket } from "../interfaces/ITicket";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

export const Landing = () => {
  const urlBack = "https://goroz-w2p1-back.onrender.com";
  const urlFront = "https://goroz-w2p1-front.onrender.com";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTicketOpen, onOpen: onTicketOpen, onClose: onTicketClose } = useDisclosure();

  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketsCount, setTicketsCount] = useState();
  const [ticketLink, setTicketLink] = useState("");
  const [newTicket, setNewTicket] = useState<ITicket>({
    vatin: "",
    firstName: "",
    lastName: "",
  });

  const ticketOptions = {
    loop: true,
    autoplay: true,
    animationData: ticket,
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(`${urlBack}/api/get-token`, {
          method: "POST",
        });
        const data = await res.json();
        if (res.ok) setToken(data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${urlBack}/api/ticket-amount`);
        const data = await res.json();
        setTicketsCount(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [ticketLink]);

  const handleTicketChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket({ ...newTicket, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${urlBack}/api/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTicket),
      });

      const data = await res.json();

      if (res.status === 200 && data) {
        onClose();
        setTicketLink(`${urlFront}/tickets/${data.id}`);
        onTicketOpen();
      } else {
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex direction="column" align="center" p="16px" mt="64px">
      <Box width="400px" height="200px" overflow="hidden">
        <Lottie options={ticketOptions} height="500px" width="500px" style={{ transform: "translate(-30px,-130px)" }} />
      </Box>
      <Heading mt="32px">Generated tickets: {ticketsCount}</Heading>
      <Button mt="32px" onClick={onOpen}>
        Generate New Ticket
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setErrorMessage("");
        }}
      >
        <ModalOverlay />
        <ModalContent bgColor="zinc.dark" color="white">
          <ModalHeader>Generate New Ticket</ModalHeader>
          <ModalCloseButton mr="4px" onClick={() => setErrorMessage("")} />

          <ModalBody>
            <Text>Vatin (OIB)</Text>
            <Input onChange={(e) => handleTicketChange("vatin", e)} />
            <Text mt="8px">First Name</Text>
            <Input onChange={(e) => handleTicketChange("firstName", e)} />
            <Text mt="8px">Last Name</Text>
            <Input onChange={(e) => handleTicketChange("lastName", e)} />

            {errorMessage && (
              <Text mt="16px" color="red.light">
                {errorMessage}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="unstyled"
              mr="4"
              onClick={() => {
                onClose();
                setErrorMessage("");
              }}
            >
              Close
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isTicketOpen} onClose={onTicketClose}>
        <ModalOverlay />
        <ModalContent bgColor="zinc.dark" color="white">
          <ModalHeader>Your New Ticket</ModalHeader>
          <ModalCloseButton mr="4px" />

          <ModalBody alignSelf="center">
            <Link to={ticketLink}>
              <QRCodeSVG value={ticketLink} size={400} />
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button variant="unstyled" onClick={onTicketClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
