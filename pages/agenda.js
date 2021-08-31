import React from "react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Box, Image } from "@chakra-ui/react";

import { useAuth } from "../modules/providers";

import { AppMain } from "../modules/wrappers";

import { MainHeader } from "../modules/components";

import axios from "axios";

const getAgenda = ({ token, when = new Date() }) =>
  axios({
    method: "get",
    url: "/api/agenda",
    params: {
      when: "2021-02-01",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export default function Agenda() {
  const router = useRouter();
  const [auth, { logout }] = useAuth();
  const [when, setWhen] = useState(() => new Date());
  //const [data, { loading, status, error}, fetch] = useFetch(() => getAgenda(when))

  useEffect(() => {
    console.log("useEffect agenda : ");
    console.log(auth);
    !auth.user && router.push("/");
  }, [auth.user]);

  return (
    auth.user && (
      <React.Fragment>
        <MainHeader logout={logout}></MainHeader>
        <AppMain>
          <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
            <Box p={(4, 2)} mt={8} width="50">
              <Image src="static/images/develop.png" alt="Em construção" />
            </Box>
          </Box>
        </AppMain>
      </React.Fragment>
    )
  );
}
