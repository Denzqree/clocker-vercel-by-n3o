import { Container, Box, Text } from '@chakra-ui/react'

export const Footer = ({ children }) => {
    return (
        <Box width="100vw" height="5vh" textAlign="center">
            <Box minWidth="275px" marginX="auto">
                <Text>{ children }</Text>
            </Box>
        </Box>
    )
}
