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
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { GoNumber } from "react-icons/go";
import { FaPlus, FaSearch, FaTrash, FaUser } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import Avatar from "react-avatar";
import { MdCall, MdSettings } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Options from "./Options";

function Contacts() {
  const { get, set } = useLocalStorage();
  const contacts = get("contacts") || [];
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const [newContact, setNewContact] = useState({ name: "", number: "" });

  const filterContacts = contacts.filter((log: any) =>
    log.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = () => {
    const updatedContacts = [...contacts, newContact];
    set("contacts", updatedContacts);
    setNewContact({ name: "", number: "" });
    onAddModalClose();
  };

  return (
    <Box p="20px" maxH="calc(100vh - 170px)" overflowY="auto">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.800">
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="20px">
            <Options />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.800">
          <ModalHeader>Add Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="20px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none">
                <GoNumber color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Number"
                value={newContact.number}
                onChange={(e) =>
                  setNewContact({ ...newContact, number: e.target.value })
                }
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleAddContact}>
              Add
            </Button>
            <Button colorScheme="red" onClick={onAddModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex mb="20px" gap={8} alignItems="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            borderRadius="18px"
            border="1px solid gray"
            placeholder="Search Contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <IconButton
          aria-label="settings"
          icon={<MdSettings />}
          ml="auto"
          variant="ghost"
          background={"red.500"}
          borderRadius={"50%"}
          _hover={{ background: "red.600" }}
          onClick={onOpen}
        />
      </Flex>
      <Box paddingBottom="240ox">
        <Button
          variant="ghost"
          mb={8}
          mt={1}
          colorScheme="none"
          leftIcon={<FaPlus />}
          onClick={onAddModalOpen}
        >
          Add Contact
        </Button>
        {filterContacts.map((log: any, index: number) => (
          <Flex key={index} alignItems="center" mb="10px">
            <Avatar
              name="John Doe"
              size="50"
              round={true}
              style={{ marginRight: "20px" }}
            />
            <Box>
              <Heading as="h3" size="md" maxW={"200px"} isTruncated>
                {log.name}
              </Heading>
            </Box>
            <IconButton
              aria-label="call"
              icon={<MdCall />}
              ml="auto"
              variant="ghost"
              background={"green.500"}
              borderRadius={"50%"}
              _hover={{ background: "green.600" }}
              onClick={() => {}}
            />
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default Contacts;
