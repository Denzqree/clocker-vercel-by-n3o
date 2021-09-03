import React from "react"
import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import axios from "axios"

import { useFetch } from "@refetty/react"

import { IconButton, Box, Link, Spinner, Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { addDays, subDays, format } from "date-fns"

import { getToken } from "../config/firebase/client"

import { formatDate } from "../modules/components"

import { useAuth } from "../modules/providers"

import { MainApp } from "../modules/wrappers"

import { MainHeader } from "../modules/components"

const getAgenda = async (when) => {
  const token = await getToken()
  if(!token){
    return
  }
  await axios({
    method: "get",
    url: "/api/agenda",
    params: {
      date: format(when, "yyyy-MM-dd"),
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
    !auth.user && router.push("/");
  }, [auth.user])

  useEffect(() => {
      fetch(when)
  },[when])

  const AgendaBlock = (time, name, phone) => (
    <Box display="flex">
      <Box flex={1}>{time}</Box>
      <Box><Text size="xl">{name}</Text>
      <Text size="sm">{phone}</Text>
      </Box>
    </Box>
  )

  return (
    auth.user && (
      <Box>
        <MainApp>
          <MainHeader logout={logout}>Visita o site da <Link href="https://www.codar.me">Codar.me</Link></MainHeader>
          <Box paddingX={8}>
            <Box
              backgroundColor="#f7f7f7"
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
              {console.log("is agenda loading... ",loading)}
              {loading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
              {console.log(data)}
              {
              data?.map(doc => (
                <AgendaBlock key={doc.time} time={doc.time} name={doc.name} phone={doc.phone} />
              ))
              }
            </Box>
          </Box>
        </MainApp>
      </Box>
    )
  )
  
}
