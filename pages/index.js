import router from "next/router";

import { useAuth } from "../providers";

import { Container, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const [auth] = useAuth();

  useEffect(() => {
    if (!auth.loading) {
      if (auth.user) {
        router.push("/agenda");
      } else {
        router.push("/sign");
      }
    }
  }, [auth]);

  return (
    <Container width="100" height="100vh" centerContent>
      <Container
        minWidth="20vh"
        marginY="auto"
        paddingX={4}
        paddingY={4}
        centerContent
      >
        <Spinner />
      </Container>
    </Container>
  );
}
