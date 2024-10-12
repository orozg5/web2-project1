import { extendTheme } from "@chakra-ui/react";
import { Input } from "./components/input";
import { Button } from "./components/button";

export const theme = extendTheme({
  colors: {
    purple: {
      lighter: "#BC9ED6",
      light: "#9E72C3",
      medium: "#924DBF",
      dark: "#7338A0",
      darker: "#4A2574",
    },
    red: {
      light: "#FF4C4C"
    },
    zinc: {
      light: "#F5F4F4",
      medium: "#322F2F",
      dark: "#191717",
      darker: "#040303",
    },
  },

  components: {
    Input,
    Button,
  },
});
