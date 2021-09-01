import router from "next/router";

import { Box, Button, Text } from "@chakra-ui/react";

import { Logo } from "../";

export const MainHeader = ({ children, logout }) => {
  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Box
      backgroundColor="#f7f7f7"
      paddingX={5}
      borderWidth="1px"
      borderBottomRadius="lg"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      minWidth="320px"
      maxWidth="640px"
      height="80px"
      flex="none"
    >
      <Logo size="170px" />
      {children}
      <Button
        borderWidth="1px"
        borderColor="grey"
        textColor="white"
        backgroundColor="#4E84D4"
        onClick={onLogout}
      >
        <Text decoration="underline">Sair</Text>
      </Button>
    </Box>
  );
};
