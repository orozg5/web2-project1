import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  field: {
    borderColor: "white",
    _hover: { borderColor: "purple.light" },
    _focus: { boxShadow: "none", border: "2px solid", borderColor: "purple.medium" },
  },
});

export const Input = defineStyleConfig({
  variants: { outline },
});
