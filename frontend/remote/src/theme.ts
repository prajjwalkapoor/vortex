//theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: "gray.800",
        color: "white",
      },
    }),
  },
});

export default theme;
