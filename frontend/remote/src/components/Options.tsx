import React, { useState, useContext, useEffect } from "react";
import { Input, Heading, Box, Container, FormControl } from "@chakra-ui/react";
import { SocketContext } from "../Context";

const Options = () => {
  const { me, callAccepted, name, setName, callEnded, callUser, devices } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

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
        <Container>
          <Box>
            <FormControl
              display="flex"
              flexDirection="column"
              aria-autocomplete="none"
              gap={2}
            >
              <Heading as="h5" size="md" color="gray.500">
                Available devices:
              </Heading>
              <p>
                {devices
                  .filter((device) => device !== me)
                  .map((device) => (
                    <div>{device}</div>
                  ))}
              </p>
              <Heading as="h5" size="md" color="gray.500" mt={4}>
                Enter the telephone hub ID to call:
              </Heading>
              <Input
                type="text"
                borderRadius="18px"
                border="1px solid gray"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                width="100%"
                disabled={callAccepted && !callEnded}
              />
              <Box mt={4}>
                <Heading as="h5" size="md" color="gray.500">
                  My ID:
                </Heading>
                <p>My ID: {me}</p>
              </Box>
            </FormControl>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Options;
