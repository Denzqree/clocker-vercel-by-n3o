import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box borderWidth="1px" borderColor="blue" backgroundColor="white" display="flex" justifyContent="center">
      {children}
    </Box>
  );
};
