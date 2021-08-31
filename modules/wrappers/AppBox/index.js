import { Box } from '@chakra-ui/react'

export const AppBox = ({ children }) => {
    return (
        <Box width="100vw" height="100vh">
            { children }
        </Box>
    )
}
