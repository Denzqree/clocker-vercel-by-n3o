import { LogoComponent } from "../";

import { 
  Container, 
  Box, 
  Button, 
  Text,
  Image,
  Badge,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import firebaseClient from '../../config/firebase/client';

const property = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  beds: 3,
  baths: 2,
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$1,900.00",
  reviewCount: 34,
  rating: 4,
}

export const AgendaComponent = () => {
    const logout = () => firebaseClient.auth().signOut();
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
            <Box zIndex="0" maxWidth="100%">
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
          <Box p={4,2} mt={8} width="50">
            <Image src="static/images/develop.png" alt="Em construção" />
          </Box>
        </Box>


        <Box p={4,2} textAlign="center">
            <Button onClick={logout}>Sair</Button>
          </Box>
        </Container>
        <Box minHeight="6vh" p={4} textAlign="center">

          <Text>Made by N3O - admin(at)n3o.pt </Text>

        </Box>
      </Container>

    )
}