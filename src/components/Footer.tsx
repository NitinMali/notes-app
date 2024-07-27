import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" py={4} mt={4}>
      <Text textAlign="center">© 2024 iNotes SC</Text>
    </Box>
  );
};

export default Footer;
