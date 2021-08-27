import Link from 'next/link';
    
import { 
    Container,
    Box, 
    Button, 
    Text, 
  } from '@chakra-ui/react';

  
import { LogoComponent } from '../LogoComponent';

export const SignOptionsComponent = (props) => {

    return (
            
        <Container p={4} centerContent>

        <Link href="./"><a><LogoComponent /></a></Link>

        <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
        </Box>


        <Box p={4,2} mt={8} width="100%">
        <Button width="100%" onClick={props.setHomeChoice(true,false)}>Login</Button>
        </Box>

        <Box p={4,2} width="100%">
        <Button width="100%" onClick={props.setHomeChoice(false,true)} colorScheme="green">Cadastrar-se</Button>
        </Box>

        </Container>
    )

};