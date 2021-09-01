import { Container, Box, Text } from '@chakra-ui/react'

export const Footer = ({ children }) => {
    return (
        <Box className="footer" backgroundColor="#f7f7f7" width="100vw" height="65px" textAlign="center" paddingY={2}>
                <Text>{ children }</Text>
        </Box>
    )
}
