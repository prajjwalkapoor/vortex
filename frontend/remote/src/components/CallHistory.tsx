import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import useLocalStorage from "../hooks/useLocalStorage";
import Avatar from "react-avatar";

function CallHistory() {
  const { get } = useLocalStorage();
  let callLogs = get("callLogs") || [];

  // Convert 'when' property to Date objects
  callLogs = callLogs.map((log: any) => ({
    ...log,
    when: new Date(log.when),
  }));

  // Sort callLogs by 'when' property
  callLogs.sort((a: any, b: any) => b.when - a.when);

  return (
    <Box p="20px" maxH="calc(100vh - 170px)" overflowY="auto">
      <Heading size="md" mb="26px">
        Call History
      </Heading>
      <Box paddingBottom="240ox">
        {callLogs.map((log: any, index: number) => (
          <Flex key={index} alignItems="center" mb="10px">
            <Avatar
              name={log.type === "INCOMING" ? "IN" : "OUT"}
              size="50"
              round={true}
              style={{ marginRight: "20px" }}
            />
            <Box>
              <p>{log.type === "INCOMING" ? "↙ INCOMING" : "↗ OUTGOING"}</p>
              <Text fontSize="sm" color="gray.500">
                {log.timeElapsed}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {log.when.toLocaleString()}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default CallHistory;
