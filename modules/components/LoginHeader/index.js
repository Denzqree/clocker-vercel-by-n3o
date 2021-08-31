import { Logo } from '../';

import { Container, Box, Text } from '@chakra-ui/react'

export const LoginHeader = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      paddingY={5}
    >
      <Box h="100%" width="100%" cursor="pointer" display="flex" onClick={(event) => (window.location.href = "/")}>
        <Box zIndex="0" width="100%">
          <Logo size="75%" marginleft="auto" marginright="auto" />
        </Box>
      </Box>
      <Box maxWidth="100%" mt={2} fontSize="1em">
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
    </Box>
  );
};
