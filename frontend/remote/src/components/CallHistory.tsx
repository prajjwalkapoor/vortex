import { useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaSearch, FaTrash } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import Avatar from "react-avatar";
import { MdCall } from "react-icons/md";

function CallHistory() {
  const { get } = useLocalStorage();
  const callLogs = get("callLogs") || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCallLogs = callLogs.filter((log: any) =>
    log.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p="20px">
      <Box mb="20px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            borderRadius="18px"
            border="1px solid gray"
            placeholder="Search call history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      {/* Call history list */}
      <Box paddingBottom="240ox">
        {filteredCallLogs.map((log: any, index: number) => (
          <Flex key={index} alignItems="center" mb="10px">
            <Avatar
              name={log.id}
              size="50"
              round={true}
              style={{ marginRight: "20px" }}
            />
            <Box>
              <Heading as="h3" size="md" maxW={"200px"} isTruncated>
                {log.id}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {new Date(log.when).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {log.timeElapsed}
              </Text>
            </Box>
            <IconButton
              aria-label="call"
              icon={<MdCall />}
              ml="auto"
              variant="ghost"
              background={"green.500"}
              borderRadius={"50%"}
              _hover={{ background: "green.600" }}
              onClick={() => {
                const updatedLogs = callLogs.filter(
                  (item: any) => item.id !== log.id
                );
                // set("callLogs", updatedLogs);
              }}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default CallHistory;
