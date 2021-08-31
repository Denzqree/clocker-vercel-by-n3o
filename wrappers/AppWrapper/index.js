import React from 'react'

export const AppWrapper = ({ children }) => {
    return (
        <Container
          minWidth="275px"
          marginY="auto"
          paddingX={4}
          paddingY={4}
          centerContent
        >
            { children }
        </Container>
    )
}
