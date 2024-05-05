import React, { useContext, useEffect } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { SocketContext } from "../Context";
import CallIncoming from "./CallIncoming";

const Notifications = () => {
  const { name, answerCall, call, callAccepted } = useContext(SocketContext);
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

  return (
    <>
      {/* {call.isReceivingCall && !callAccepted && (
        // <Box display="flex" justifyContent="space-around" mb="20" p={8}>
        //   <h6> {call.from} is calling </h6>
        //   <Button
        //     colorScheme="teal"
        //     onClick={answerCall}
        //     border="1px"
        //     borderStyle="solid"
        //     borderColor="black"
        //     p={5}
        //   >
        //     Answer Call
        //   </Button>
        // </Box>
        <CallIncoming />
      )} */}
    </>
  );
};
export default Notifications;
