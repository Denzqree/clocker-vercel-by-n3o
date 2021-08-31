import {
    LogoComponent,
  } from "../components";
  
  import { Container, Box, Button, Text, Spinner } from "@chakra-ui/react";

export default function SignOptions() {
    return (
      <Container width="100" height="100vh" centerContent>
        <Container
          minWidth="20vh"
          marginY="auto"
          paddingX={4}
          paddingY={4}
          centerContent
        >
          <Container
            p={5}
            width="100%"
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            centerContent
          >
            <Box h="100" cursor="pointer">
              <Box zIndex="0">
                <LogoComponent size="auto"/>
              </Box>
              <Box
                height="100"
                position="relative"
                top="-100"
                left="0"
                onClick={event =>  window.location.href='/'}
              ></Box>
            </Box>
            <Text>Crie sua agenda compartilhada</Text>
          </Container>

          <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={event =>  window.location.href='/login'}>
                Login
              </Button>
            </Box>
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={event =>  window.location.href='/register'}
                colorScheme="green"
              >
                Cadastrar-se
              </Button>
            </Box>
          </Box>
        </Container>

        <Box minHeight="auto" p={4} textAlign="center">
          <Text>Made by N3O - admin(at)n3o.pt </Text>
        </Box>
      </Container>
    );
  };