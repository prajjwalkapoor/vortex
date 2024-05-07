import React, { useContext, useEffect, useState } from "react";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneAlt,
  FaPhoneSlash,
} from "react-icons/fa";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Avatar from "react-avatar";

import useLocalStorage from "../hooks/useLocalStorage";
import { SocketContext } from "../Context";
import DiallerPad from "./DiallerPad";

function CallIncoming() {
  const { name, answerCall, call, callAccepted, callEnded, leaveCall } =
    useContext(SocketContext);
  const { get, set } = useLocalStorage();
  const [idToCall] = useState("");
  const [callTime, setCallTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

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

  useEffect(() => {
    if (callEnded) {
      const prevCallLogs = get("callLogs") || [];

      const newCallData = {
        when: new Date().toISOString(),
        timeElapsed: formatTime(callTime),
        type: call.isCalling ? "OUTGOING" : "INCOMING",
      };
      prevCallLogs.push(newCallData);
      set("callLogs", prevCallLogs);
    }
  }, [callEnded]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = new Audio("/shuvo.mp3");
    if (call.isReceivingCall && !callAccepted) {
      audio.loop = true;
      audio.play();
    }
    return () => {
      audio.pause();
    };
  }, [call, name, callAccepted]);

  if (call.isReceivingCall && !callAccepted) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={8}
        position={"fixed"}
        backgroundColor="gray.800"
        zIndex={99}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        w={"100%"}
        height="100vh"
      >
        <Avatar
          name={call.from}
          size="100"
          round={true}
          style={{ marginRight: "20px" }}
        />
        <Heading as="h2" mb="4" fontSize="2xl" isTruncated>
          {call.name}
        </Heading>
        <Flex justifyContent="center" mb="8">
          <IconButton
            aria-label="Answer"
            icon={<FaPhoneAlt />}
            colorScheme="green"
            mr="4"
            onClick={answerCall}
            borderRadius="full"
            size="lg"
          />
          <IconButton
            aria-label="Decline"
            icon={<FaPhoneSlash />}
            colorScheme="red"
            borderRadius="full"
            size="lg"
            onClick={leaveCall}
          />
        </Flex>
      </Box>
    );
  } else if (callAccepted && !callEnded && call.isCalling) {
    <>
      <DiallerPad />
    </>;
  } else if (callAccepted && !callEnded)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={8}
        position={"fixed"}
        backgroundColor="gray.800"
        zIndex={99}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        w={"100%"}
        height="100vh"
      >
        <Avatar
          name={call.from}
          size="100"
          round={true}
          style={{ marginRight: "20px" }}
        />
        <Heading as="h2" mb="4" fontSize="2xl" isTruncated>
          ONGOING CALL
        </Heading>
        <p>{formatTime(callTime)}</p>
        <Flex justifyContent="center" mb="8">
          <IconButton
            aria-label="mute"
            icon={isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            color={isMuted ? "red" : "white"}
            backgroundColor="gray.700"
            colorScheme="none"
            mr="4"
            onClick={() => setIsMuted(!isMuted)}
            borderRadius="full"
            size="lg"
          />
          <IconButton
            aria-label="speaker"
            icon={isSpeakerOn ? <HiVolumeUp /> : <HiVolumeOff />}
            color={isSpeakerOn ? "green" : "white"}
            backgroundColor="gray.700"
            mr="4"
            colorScheme="none"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            borderRadius="full"
            size="lg"
          />
        </Flex>

        <Flex justifyContent="center" mb="8">
          <IconButton
            aria-label="Decline"
            icon={<FaPhoneSlash />}
            colorScheme="red"
            onClick={leaveCall}
            borderRadius="full"
            size="lg"
          />
        </Flex>
      </Box>
    );

  return <></>;
}

export default CallIncoming;
