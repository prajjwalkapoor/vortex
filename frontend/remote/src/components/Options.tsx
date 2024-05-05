import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Input,
  FormLabel,
  Heading,
  Grid,
  Box,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
import { SocketContext } from "../Context";
import useLocalStorage from "../hooks/useLocalStorage";
import DiallerPad from "./DiallerPad";
import { FaHistory } from "react-icons/fa";
import CallHistory from "./CallHistory";
const Options = () => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    devices,
  } = useContext(SocketContext);
  // const { get, set } = useLocalStorage();
  const [idToCall, setIdToCall] = useState("");
  // const [callTime, setCallTime] = useState<number>(0);
  // const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // useEffect(() => {
  //   if (callAccepted) {
  //     const startTime = Date.now();
  //     const timer = setInterval(() => {
  //       const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // elapsed time in seconds
  //       setCallTime(elapsedTime);
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   } else {
  //     setCallTime(0);
  //   }
  // }, [callAccepted]);

  // useEffect(() => {
  //   if (callEnded) {
  //     const prevCallLogs = get("callLogs") || [];

  //     const newCallData = {
  //       id: idToCall,
  //       when: new Date().toISOString(),
  //       timeElapsed: formatTime(callTime),
  //     };
  //     prevCallLogs.push(newCallData);
  //     set("callLogs", prevCallLogs);
  //   }
  // }, [callEnded]);

  // const formatTime = (time: number): string => {
  //   const hours = Math.floor(time / 3600);
  //   const minutes = Math.floor((time % 3600) / 60);
  //   const seconds = Math.floor(time % 60);

  //   return `${hours.toString().padStart(2, "0")}:${minutes
  //     .toString()
  //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  // };

  const startCall = (phoneId: string) => {
    if (idToCall) {
      setName(phoneId);
    } else alert("Please enter the landline hub ID");
  };

  useEffect(() => {
    if (name.length > 0) {
      callUser(idToCall);
    }
  }, [name]);

  useEffect(() => {
    const list = devices.filter((device) => device !== me);
    if (list.length > 0) {
      setIdToCall(list[0]);
    }
  }, [devices]);

  return (
    <>
      <Box>
        <Container maxW="1200px" m="35px 0" p="0">
          <Box p="10px" border="2px" borderColor="black" borderStyle="solid">
            <FormControl
              display="flex"
              flexDirection="column"
              aria-autocomplete="none"
              gap={2}
            >
              <p>
                Available devices:{" "}
                {devices
                  .filter((device) => device !== me)
                  .map((device) => (
                    <div>{device}</div>
                  ))}
              </p>
              <FormLabel> Enter the telephone hub id </FormLabel>
              <Input
                type="text"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                width="100%"
                disabled={callAccepted && !callEnded}
              />

              {(!callAccepted || callEnded) && (
                <>
                  <Button
                    onClick={() => startCall("94554754789")}
                    colorScheme="orange"
                    leftIcon={<BiPhoneCall />}
                  >
                    Call Now
                  </Button>
                </>
              )}
              <p>Call from: {name}</p>
              <p>My ID: {me}</p>
              {callAccepted && !callEnded && (
                <>
                  <Button
                    leftIcon={<BiPhoneOff />}
                    onClick={leaveCall}
                    mt="5"
                    colorScheme="red"
                  >
                    Hang up
                  </Button>
                  {/* <p>Call Time: {formatTime(callTime)}</p> */}
                </>
              )}
            </FormControl>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Options;
