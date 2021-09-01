import { useEffect } from "react";

import router from "next/router";

import { Box, Text, Spinner } from "@chakra-ui/react";

import { useAuth } from "../modules/providers";

import { CentererBox } from "../modules/wrappers";

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
    <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
        <Text>&nbsp;Carregando...</Text>
    </Box>
  );
}
