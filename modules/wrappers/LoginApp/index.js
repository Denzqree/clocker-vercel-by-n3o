import { Box } from "@chakra-ui/react";

export const LoginApp = ({ children }) => {
  return (
    <Box minWidth="320px" width="640px" paddingTop="75px" paddingX={5}>
      {children}
    </Box>
  );
};
