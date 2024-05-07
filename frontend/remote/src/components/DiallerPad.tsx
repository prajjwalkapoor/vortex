import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Text, Flex, IconButton, Box } from "@chakra-ui/react";
import { FaPhoneAlt, FaBackspace } from "react-icons/fa";
import { SocketContext } from "../Context";
import useLocalStorage from "../hooks/useLocalStorage";

function DiallerPad() {
  const { call, leaveCall, callAccepted, playDTMFTone, callEnded } =
    useContext(SocketContext);
  const [number, setNumber] = useState("");
  const { get, set } = useLocalStorage();
  const [callTime, setCallTime] = useState<number>(0);

  useEffect(() => {
    if (callAccepted) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setCallTime(elapsedTime);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCallTime(0);
    }
  }, [callAccepted]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleButtonClick = (button: string) => {
    setNumber((prevNumber) => prevNumber + button);
    playDTMFTone(button);
  };

  const handleDeleteButtonClick = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
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
          <Box>
            <Text fontSize="xl">
              {callAccepted ? "Connected to hub" : "Connecting to hub..."}
            </Text>
            <p>{formatTime(callTime)}</p>
          </Box>
          <Button
            onClick={() => {
              if (callAccepted) {
                const prevCallLogs = get("callLogs") || [];

                const newCallData = {
                  when: new Date().toISOString(),
                  timeElapsed: formatTime(callTime),
                  type: call.isCalling ? "OUTGOING" : "INCOMING",
                };
                prevCallLogs.push(newCallData);
                set("callLogs", prevCallLogs);
                leaveCall();
              }
            }}
            backgroundColor={callAccepted ? "red.500" : "gray.900"}
            color="white"
            borderRadius="full"
            size="lg"
          >
            Hang Up
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
            <div></div>
            <IconButton
              aria-label="Delete"
              icon={<FaBackspace />}
              color={"white"}
              background={"gray.700"}
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
