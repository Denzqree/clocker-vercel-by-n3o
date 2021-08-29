import { ChakraProvider } from "@chakra-ui/react"

import { AuthProvider } from './../providers'

import '../styles/text.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
