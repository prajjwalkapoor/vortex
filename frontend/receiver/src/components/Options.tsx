import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Input,
  FormLabel,
  Box,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { BiPhoneOff } from "react-icons/bi";
import { SocketContext } from "../Context";

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
    serialIncoming,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const startCall = () => {
    if (idToCall) {
      setName("INCOMING CALL");
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

  useEffect(() => {
    if (serialIncoming) {
      setName("INCOMING CALL");
    }
  }, [serialIncoming]);

  return (
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
          />

          <Button onClick={() => startCall()} colorScheme="green">
            Call Now
          </Button>
          <p>Call from: {name}</p>
          <p>My ID: {me}</p>
          {callAccepted && !callEnded ? (
            <Button
              leftIcon={<BiPhoneOff />}
              onClick={leaveCall}
              mt="20"
              colorScheme="red"
            >
              Hang up
            </Button>
          ) : (
            <></>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};
export default Options;
