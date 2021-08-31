import { useEffect } from "react";

import router from "next/router";

import { Box, Spinner } from "@chakra-ui/react";

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
    <CentererBox>
      <Box width="100px" height="100px" marginY="auto" marginX="auto">
        <Spinner />
      </Box>
    </CentererBox>
  );
}
