import React from "react";
import { Box, Heading, Select, Text, Flex, Spacer } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  return (
    <Flex bg="teal.500" p={2} color="white">
      <Heading textAlign="left">iNotes SC</Heading>
      <Spacer/>
      <SunIcon m={2}/>
      <Heading p={2} size="md">Hey, John :)</Heading>
      <Spacer/>
      <Text p={2}>Login as</Text>
      <Box>
        <Select>
          <option value="John">John</option>
          <option value="Amar">Amar</option>
          <option value="Priya">Priya</option>
        </Select>
      </Box>
    </Flex>
  );
};

export default Header;
