import Link from "next/link";

import { useEffect, useState } from "react";

import {
  AgendaComponent,
  LoginComponent,
  LogoComponent,
  SignUpComponent,
} from "../";

import { Container, Spinner, Box, Button, Text, Flex } from "@chakra-ui/react";

import firebaseClient from "../../config/firebase/client";

export const HomeComponent = (props) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

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

  useEffect(() => {
    const onLogin = firebaseClient.auth().onAuthStateChanged((user) => {
      console.log("user state changed");
      setAuth({
        loading: false,
        user: user,
      });
    });

    return () => onLogin();
  }, []);

  console.log("--------------render------------------");
  console.log(auth);
  console.log(homeChoice);
  console.log("------------------------------------");

  if (auth.loading) {
    console.log("------------------------------------");
    console.log("Loading..");
    console.log(auth);
    console.log(homeChoice);
    console.log("------------------------------------");
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    );
  }

  if (homeChoice.login) {
    return <LoginComponent setAuth={setAuth} setHomeChoice={setHomeChoice} />;
  }

  if (homeChoice.signup) {
    return <SignUpComponent setHomeChoice={setHomeChoice} />;
  }

  return auth.user ? (
    <AgendaComponent />
  ) : (
    <SignOptions setHomeChoice={setHomeChoice} />
  );
};
