import { Container, Box, Text } from '@chakra-ui/react'

export const Footer = ({ children }) => {
    return (
        <Box backgroundColor="#f7f7f7" width="100vw" height="65px" zIndex="2" textAlign="center" paddingY={2} marginTop="-65px">
                <Text>{ children }</Text>
        </Box>
    )
}
