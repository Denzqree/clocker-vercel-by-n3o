import router from 'next/router'

import { Container, Button } from '@chakra-ui/react'

import { Logo } from '../'

export const MainHeader = ({ children, logout }) => {

    const onLogout = () => {
        logout();
        router.push("/");
    }

    return (
        <Container backgroundColor="black" display="flex" justifyContent="space-between" alignItems="center" width="100vw">
            <Logo size="200px"/>{ children } 
            <Button onClick={onLogout}>Sair</Button>
        </Container>
    )
}