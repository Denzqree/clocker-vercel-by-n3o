import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box className="centererBox" backgroundColor="white" width="100%">
      {children}
    </Box>
  );
};
