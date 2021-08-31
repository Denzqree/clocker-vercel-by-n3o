import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box display="flex" justifyContent="center" height="100vh" width="100vw">
      {children}
    </Box>
  );
};
