import React, { useEffect } from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Select, Text, Flex, Spacer } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { setUsername } from "../store/foldersSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.folders.username);

  useEffect(()=> {
    if(!sessionStorage.getItem('username')) {
      dispatch(setUsername('John'));
    } else {
      const savedUsername = sessionStorage.getItem('username');
      dispatch(setUsername(savedUsername));
    }
  }, []);

  const handleUsernameChange = (username: string) => {
    setUsername(username);
    dispatch(setUsername(username));
    navigate("/");
  };
  return (
    <Flex bg="green.500" p={2} color="white">
      <Heading textAlign="left">iNotes SC</Heading>
      <Spacer />
      <SunIcon m={2} />
      <Heading p={2} size="md">
        Hey, {username} :)
      </Heading>
      <Spacer />
      <Text p={2}>Login as</Text>
      <Box>
        <Select
          onChange={(e) => handleUsernameChange(e.target.value)}
          variant="filled"
          bg="white"
          color="black"
          value={username ? username : "John"}
        >
          <option value="John">John</option>
          <option value="Amar">Amar</option>
          <option value="Priya">Priya</option>
        </Select>
      </Box>
    </Flex>
  );
};

export default Header;