import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box className="centererBox" backgroundColor="white" display="flex" justifyContent="center" width="100%">
      {children}
    </Box>
  );
};
