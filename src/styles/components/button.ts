import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: "8px",
  bgColor: "purple.light",
  _hover: { bgColor: "purple.lighter" },
  color: "white",
});

const unstyled = defineStyle({
  color: "purple.light",
  _hover: { color: "purple.lighter" },
});

export const Button = defineStyleConfig({
  variants: { solid, unstyled },
});
