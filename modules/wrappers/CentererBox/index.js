import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box backgroundColor="white" display="flex" justifyContent="center" alignItems="center" height="calc(100%-65px)" width="100%">
      {children}
    </Box>
  );
};
