import { Box } from '@chakra-ui/react'

export const AppBox = ({ children }) => {
    return (
        <Box width="100vw" className="app" borderWidth="1px" borderColor="red">
            { children }
        </Box>
    )
}
