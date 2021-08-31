import router from 'next/router'

import { Box, Button } from '@chakra-ui/react'

import { Logo } from '../'

export const MainHeader = ({ children, logout }) => {

    const onLogout = () => {
        logout();
        router.push("/");
    }

    return (
        <Box backgroundColor="#f7f7f7" padding={2} borderWidth="1px" borderBottomRadius="lg" display="flex" justifyContent="space-between" alignItems="center" minWidth="320px" width="100%">
            <Logo size="150px"/>{ children } 
            <Button borderWidth="1px" borderColor="grey" textColor="black" backgroundColor="#f7f7f7" onClick={onLogout}>Sair</Button>
        </Box>
    )
}