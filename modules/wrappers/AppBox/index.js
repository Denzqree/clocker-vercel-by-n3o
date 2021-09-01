import { Box } from '@chakra-ui/react'

export const AppBox = ({ children }) => {
    return (
        <Box width="100vw" className="app">
            { children }
        </Box>
    )
}
