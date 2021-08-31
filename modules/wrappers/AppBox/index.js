import { Box } from '@chakra-ui/react'

export const AppBox = ({ children }) => {
    return (
        <Box width="100vw" height="93vh">
            { children }
        </Box>
    )
}
