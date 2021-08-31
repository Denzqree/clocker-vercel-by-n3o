import { ChakraProvider } from "@chakra-ui/react"

import { AuthProvider } from './../modules/providers'

import { AppBox } from "../modules/wrappers"

import { Footer } from "../modules/wrappers"

import '../styles/text.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <AuthProvider>
          <AppBox>
              <Component {...pageProps} />
          </AppBox>
          <Footer>Made by N3O - admin(at)n3o.pt<br />https://github.com/Denzqree/clocker-vercel-by-n3o</Footer>
        </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
