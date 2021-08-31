import { useEffect } from "react"

import router from "next/router"

import { Spinner } from "@chakra-ui/react"

import { useAuth } from "../modules/providers"

import { AppLogin } from "../modules/wrappers"


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
    <AppLogin>
        <Spinner />
    </AppLogin>
  );
}
