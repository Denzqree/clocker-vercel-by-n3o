import { Box } from '@chakra-ui/react'

export const AppCentering = ({ children }) => {
    return (
        <Box width="100vw" height="95vh" display="flex" alignContent="center" justifyContent="center">
            { children }
        </Box>
    )
}
