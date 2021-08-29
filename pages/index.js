import {
  AgendaComponent,
  LoginComponent,
  LogoComponent,
  SignUpComponent,
} from "../components/";

import { useAuth } from "../providers";

import { Container, Spinner, Box, Button, Text } from "@chakra-ui/react";

import { useState } from "react";

export default function Home(props) {

  const [auth] = useAuth()

  const [homeChoice, setHomeChoice] = useState({
    login: props.login || false,
    signup: props.signup || false,
  });

  const SignOptions = () => {
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
                <LogoComponent />
              </Box>
              <Box
                height="100"
                position="relative"
                top="-100"
                left="0"
                onClick={() => window.location.reload()}
              ></Box>
            </Box>
            <Text>Crie sua agenda compartilhada</Text>
          </Container>

          <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={() => setHomeChoice({ login: true, signup: false })}
              >
                Login
              </Button>
            </Box>
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={() => setHomeChoice({ login: false, signup: true })}
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


  if (auth.loading && auth.user) {
    return (
      <Container width="100" height="100vh" centerContent>
        <Container
          minWidth="20vh"
          marginY="auto"
          paddingX={4}
          paddingY={4}
          centerContent
        >
          <Spinner />
        </Container>
      </Container>
    );
  }
  

  if (homeChoice.login) {
    return <LoginComponent setHomeChoice={setHomeChoice} />;
  }

  if (homeChoice.signup) {
    return <SignUpComponent setHomeChoice={setHomeChoice} />;
  }

    if(auth.user) {
        return <AgendaComponent />
    }else{
        return <SignOptions setHomeChoice={setHomeChoice} />
    }
}
