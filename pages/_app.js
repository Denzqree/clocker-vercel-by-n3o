import { ChakraProvider, Link } from "@chakra-ui/react"

import { AuthProvider } from './../modules/providers'

import { AppBox } from "../modules/wrappers"

import { Footer } from "../modules/wrappers"

import '../styles/globals.css';
import '../styles/text.css';
import '../styles/textscroll.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <AuthProvider>
          <AppBox>
              <Component {...pageProps} />
              <Footer>Made by N3O - admin(at)n3o.pt<br /><Link href="https://github.com/Denzqree/clocker-vercel-by-n3o">github.com/Denzqree/clocker-vercel-by-n3o</Link></Footer>
          </AppBox>
        </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
