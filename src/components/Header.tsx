import React from "react";
import { Box, Heading, Button, Select, Text } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={2}
      py={1}
      bg="teal.500"
      color="white"
    >
      <Heading textAlign="left">iNotes SC</Heading>
      <Box>
        <Text>Login as</Text>
        <Select>
          <option value="John">John</option>
          <option value="Amar">Amar</option>
          <option value="Priya">Priya</option>
        </Select>
      </Box>
    </Box>
  );
};

export default Header;
