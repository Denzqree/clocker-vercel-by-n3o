import { LogoComponent } from '../';

export const index = () => {
  return (
    <Container
      p={5}
      pt={7}
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      centerContent
    >
      <Box h="100%" cursor="pointer">
        <Box zIndex="0" width="100%">
          <LogoComponent size="" marginLeft="auto" marginRight="auto" />
        </Box>
        <Box
          height="100%"
          position="absolute"
          top="-100"
          left="0"
          onClick={(event) => (window.location.href = "/")}
        ></Box>
      </Box>
      <Box maxWidth="100%" mt={7}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
    </Container>
  );
};
