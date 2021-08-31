import React from "react"
import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import axios from "axios"

import { useFetch } from "@refetty/react"

import { IconButton, Box } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { addDays, subDays } from "date-fns"

import { getToken } from "../config/firebase/client"

import { formatDate } from "../modules/components"

import { useAuth } from "../modules/providers"

import { MainApp } from "../modules/wrappers"

import { MainHeader } from "../modules/components"

const getAgenda = async (when) => {
  const token = await getToken()
  axios({
    method: "get",
    url: "/api/agenda",
    params: {
      when,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default function Agenda() {
  const router = useRouter();
  const [auth, { logout }] = useAuth();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, { lazy: true })

  const removeDay = () => setWhen(prevState => subDays(when, 1))

  const addDay = () =>  setWhen(prevState => addDays(when, 1))

  useEffect(() => {
      fetch(when)
  },[when])

  useEffect(() => {
    console.log("useEffect agenda : ");
    console.log(auth);
    !auth.user && router.push("/");
  }, [auth.user])

  return (
    auth.user && (
      <Box>
        <MainApp>
          <MainHeader logout={logout}>clocker.n3o.pt</MainHeader>
          <Box paddingX={8}>
            <Box
              marginTop={2}
              padding={4}
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Box>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <IconButton
                    aria-label="Go to the previous day of the agenda"
                    icon={<ChevronLeftIcon />}
                    background="transparent"
                    isRound="true"
                    boxSize="30px"
                    onClick={removeDay}
                  />
                  <Box text-align="center">
                    {formatDate(when, "PPPP").toLocaleUpperCase()}
                  </Box>
                  <IconButton
                    aria-label="Go to the next day of the agenda"
                    icon={<ChevronRightIcon />}
                    background="transparent"
                    isRound="true"
                    boxSize="30px"
                    onClick={addDay}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              marginTop={2}
              padding={4}
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
            >
              test
            </Box>
          </Box>
        </MainApp>
      </Box>
    )
  )
  
}
