import { Tabs, TabList, Tab, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaHistory, FaUser } from "react-icons/fa";
import { MdDialpad } from "react-icons/md";
import { SocketContext } from "../Context";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const { me, name, setName, callUser, devices, setCall } =
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
    <Tabs
      variant="unstyled"
      colorScheme="teal"
      isLazy
      position="fixed"
      marginLeft="-16px"
      borderRadius="16px 16px 0 0"
      w={["100vw", "100vw", "100vw", "100vw"]}
      h={32}
      bottom="0"
      zIndex="10"
      backgroundColor="gray.700"
      pt={4}
    >
      <TabList
        display="flex"
        justifyContent="space-around"
        color="white"
        p="4"
        w={["100%", "100%", "100%", "100%"]}
      >
        <Tab
          w={["30%", "30%", "30%", "30%"]}
          p={"4"}
          _focus={{ boxShadow: "none" }}
          _hover={{ backgroundColor: "gray.900" }}
          borderRadius="32px"
          backgroundColor={
            activeTab === "contacts" ? "gray.900" : "transparent"
          }
          onClick={() => setActiveTab("contacts")}
        >
          <FaUser color={iconColor} />
        </Tab>
        <Tab
          w={["30%", "30%", "30%", "30%"]}
          p={"4"}
          _focus={{ boxShadow: "none" }}
          _hover={{ backgroundColor: "gray.900" }}
          borderRadius="32px"
          backgroundColor={activeTab === "dialer" ? "gray.900" : "transparent"}
          onClick={() => {
            startCall("94554754789");
            setCall((prev) => {
              return {
                ...prev,
                isCalling: true,
              };
            });
            setActiveTab("dialer");
          }}
        >
          <MdDialpad color={iconColor} />
        </Tab>
        <Tab
          w={["30%", "30%", "30%", "30%"]}
          p={"4"}
          _focus={{ boxShadow: "none" }}
          _hover={{ backgroundColor: "gray.900" }}
          borderRadius="32px"
          backgroundColor={activeTab === "logs" ? "gray.900" : "transparent"}
          onClick={() => setActiveTab("logs")}
        >
          <FaHistory color={iconColor} />
        </Tab>
      </TabList>
    </Tabs>
  );
}

export default Navbar;
