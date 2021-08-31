import React from 'react'

export const AppCenterer = ({ children }) => {
    return (
        <Container width="100" height="100vh" centerContent>
            {props.children}
        </Container>
    )
}
