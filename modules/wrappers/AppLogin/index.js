import { Box } from '@chakra-ui/react'

export const AppLogin = ({ children }) => {
    return (
        <Box
          minWidth="320px"
          width="35vw"
          paddingTop="15vh"
          paddingX={5}    
        >
            { children }
        </Box>
    )
}
