import { Box } from '@chakra-ui/react'

import { CentererBox } from "../CentererBox"

export const MainApp = ({ children }) => {
    return (
        <CentererBox>
        <Box
          minWidth="320px"
          width="780px"
          marginY="auto"
          paddingX="0"
        >
            { children }
        </Box>
        </CentererBox>
    )
}
