import { ChakraProvider } from "@chakra-ui/react"

import { AuthProvider } from './../modules/providers'

import { AppCentering } from "../modules/wrappers"

import { Footer } from "../modules/wrappers"

import '../styles/text.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <AuthProvider>
          <AppCentering>
            <Component {...pageProps} />
          </AppCentering>
          <Footer>Made by N3O - admin(at)n3o.pt</Footer>
        </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
