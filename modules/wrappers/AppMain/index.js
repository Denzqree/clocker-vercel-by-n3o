import { Box } from '@chakra-ui/react'

export const AppMain = ({ children }) => {
    return (
        <Box
          minWidth="320px"
          width="780px"
          marginY="auto"
          paddingX="0"
        >
            { children }
        </Box>
    )
}
