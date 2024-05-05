import { Box, Heading, Container } from "@chakra-ui/react";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <Box>
      <Container maxW="1200px" mt="8">
        <Heading as="h6" size="s">
          {" "}
          HCI Lab project demo{" "}
        </Heading>
        <VideoPlayer />
        <Options />
        <Notifications />
      </Container>
    </Box>
  );
}
export default App;
