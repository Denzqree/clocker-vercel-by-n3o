import { Box } from '@chakra-ui/react'

export const CentererBox = ({ children }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row">
      {children}
    </Box>
  );
};
