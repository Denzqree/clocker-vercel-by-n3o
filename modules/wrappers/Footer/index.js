import { Container, Box, Text } from '@chakra-ui/react'

export const Footer = ({ children }) => {
    return (
        <Box backgroundColor="#f7f7f7" width="100vw" height="65px" textAlign="center" paddingY={2} position="absolute" bottom="0">
                <Text>{ children }</Text>
        </Box>
    )
}
