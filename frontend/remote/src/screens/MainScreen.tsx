import { useState } from "react";
import Navbar from "../components/Navbar";
import { Container } from "@chakra-ui/react";
import Options from "../components/Options";
import CallHistory from "../components/CallHistory";
import DiallerPad from "../components/DiallerPad";
import CallIncoming from "../components/CallIncoming";
import Contacts from "../components/Contacts";

function MainScreen() {
  const [activeTab, setActiveTab] = useState("contacts");
  return (
    <>
      <CallIncoming />
      <Container maxW="100vw" mt="8">
        {activeTab === "contacts" && <Contacts />}
        {activeTab === "dialer" && <DiallerPad />}
        {activeTab === "logs" && <CallHistory />}

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </Container>
    </>
  );
}

export default MainScreen;
