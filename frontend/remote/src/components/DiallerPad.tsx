import React, { useContext, useState } from "react";
import { Grid, Button, Text, Flex, IconButton, Box } from "@chakra-ui/react";
import { FaPhoneAlt, FaBackspace, FaHistory } from "react-icons/fa";
import { SocketContext } from "../Context";

function DiallerPad() {
  const { call, leaveCall, callAccepted, playDTMFTone } =
    useContext(SocketContext);
  const [number, setNumber] = useState("");

  const handleButtonClick = (button: string) => {
    setNumber((prevNumber) => prevNumber + button);
    playDTMFTone(button);
  };

  const handleDeleteButtonClick = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleCallButtonClick = () => {
    console.log("Call button clicked");
  };

  const diallerButtons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
    "#",
  ];

  return (
    <>
      {call.isCalling && (
        <Flex
          justify="space-between"
          align="center"
          p="4"
          position="absolute"
          top={0}
          left={0}
          w={"100vw"}
          zIndex={99}
        >
          <Text fontSize="xl">
            {callAccepted ? "Connected to hub" : "Connecting to hub..."}
          </Text>
          <Button
            onClick={() => {
              if (callAccepted) {
                leaveCall();
              }
            }}
            backgroundColor={callAccepted ? "red.500" : "gray.900"}
            color="white"
            borderRadius="full"
            size="lg"
          >
            Hung Up
          </Button>
        </Flex>
      )}
      <Flex direction="column" justify="end" h={"calc(100vh - 240px)"}>
        <Box>
          <Text fontSize="xl" textAlign="center" mb="4" minH={16}>
            {number}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
            {diallerButtons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(button)}
                backgroundColor="gray.900"
                color="white"
                w="100%"
                borderRadius="full"
                _hover={{ backgroundColor: "gray.700" }}
              >
                {button}
              </Button>
            ))}
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={3} mt="26px">
            <div></div>
            <IconButton
              aria-label="Call"
              icon={<FaPhoneAlt />}
              colorScheme="green"
              onClick={handleCallButtonClick}
              borderRadius={"full"}
            />
            <IconButton
              aria-label="Delete"
              icon={<FaBackspace />}
              colorScheme="red"
              onClick={handleDeleteButtonClick}
              borderRadius={"full"}
            />
          </Grid>
        </Box>
      </Flex>
    </>
  );
}

export default DiallerPad;
