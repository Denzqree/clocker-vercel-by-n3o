import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box backgroundColor="white" display="flex" justifyContent="center">
      {children}
    </Box>
  );
};
