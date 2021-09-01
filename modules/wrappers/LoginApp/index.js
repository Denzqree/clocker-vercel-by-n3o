import { Box } from "@chakra-ui/react";

export const LoginApp = ({ children }) => {
  return (
    <Box minWidth="320px" width="640px" paddingTop="10vh" paddingX={5}>
      {children}
    </Box>
  );
};
