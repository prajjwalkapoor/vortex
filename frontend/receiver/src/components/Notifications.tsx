import React, { useContext, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { SocketContext } from "../Context";

const Notifications = () => {
  const { name, answerCall, call, callAccepted } = useContext(SocketContext);
  const getBackgroundColor = () => {
    const nameToCheck = call.name || name;
    switch (nameToCheck) {
      case "Control_Phone_1":
        return "#ffcccc";
      case "Hotline_1":
        return "#ccffcc";
      case "Hotline_2":
        return "#ccccff";
      case "Walkie_Talkie":
        return "#ffffcc";
      default:
        return "#ffffff";
    }
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      answerCall();
    }
  }, [answerCall, call.isReceivingCall, callAccepted]);

  return (
    <>
      {/* {call.isReceivingCall && !callAccepted && (
                <Box display="flex" justifyContent="space-around" mb="20" bg={getBackgroundColor()} p={8}>
                    <h6> {call.name} is calling </h6>
                    <Button colorScheme='teal' onClick={answerCall} border="1px" borderStyle="solid" borderColor="black" p={5}>
                        Answer Call
                    </Button>
                </Box>
            )} */}
    </>
  );
};
export default Notifications;
