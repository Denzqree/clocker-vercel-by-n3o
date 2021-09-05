import React from "react"
import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import axios from "axios"

import { useFetch } from "@refetty/react"

import { IconButton, Box, Link, Spinner, Text } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { addDays, subDays, format } from "date-fns"

import { getToken } from "../config/firebase/client"

import { formatDate, MainHeader } from "../modules/components"

import { useAuth } from "../modules/providers"

import { MainApp, CentererBox } from "../modules/wrappers"

const getAgenda = async (when) => {
  const token = await getToken()
  if(!token){
    return
  }
  return await axios({
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
  
  const [auth, { logout, getUsername }] = useAuth();
  const [username, setUsername] = useState()
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, { lazy: true })

  const removeDay = () => setWhen(prevState => subDays(when, 1))
  const addDay = () =>  setWhen(prevState => addDays(when, 1))

  useEffect(async () => {
    !auth.user && router.push("/");
  }, [auth.user])

  useEffect(() => {
      fetch(when)
  },[when])

  useEffect(async () => {
    setUsername(await getUsername());
  },[])

  const AgendaBlock = ({isScheduled, time, name, phone}) => {
    if(isScheduled){
    return (
    <Box display="flex" width="100%" marginTop={4} padding={4} backgroundColor="#f7f7f7" borderWidth="1px" borderRadius="lg" minHeight="100px" alignItems="center">
      <Box flex={1} textColor="#4E84D4">{time}</Box>
      <Box><Text size="xl" fontWeight="bold">{name}</Text>
      <Text size="sm">{phone}</Text>
      </Box>
    </Box>
    )
  } else {
    return (
      <Box display="flex" width="100%"  marginTop={4} padding={4} borderWidth="1px" borderColor="#4E84D4" textColor="#4E84D4" borderRadius="lg" alignItems="center" minHeight="100px" textAlign="center">
        <Box flex={1}>{time} - LIVRE</Box>
      </Box>
      )
    }
  }

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
            <Box display="flex"
            flexDirection="column"
              marginTop={2}
              padding={4}
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
              alignItems="center"
              justifyContent="center"
            >
              { loading && (
                <>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
                <Text>Carregando sua agenda ...</Text>
                </>
              )}
            {
              data?.map((doc) => {
                if(doc.isScheduled){
                  return (
                        <AgendaBlock isScheduled={doc.isScheduled} key={doc.time} time={doc.time} name={doc.name} phone={doc.phone} />
                  )
                }else{
                  return (
                    <AgendaBlock isScheduled={doc.isScheduled} key={doc.time} time={doc.time} />
              )
                }
              })
            }
            </Box>
            <Box
              textAlign="center"
              alignItems="center"
              backgroundColor="#f7f7f7"
              marginY={2}
              padding={4}
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
              height="auto">
                  <Text marginBottom={2} fontWeight="bold">Endereço da sua agenda</Text>{auth.user && (<Link href={window.location.origin+'/'+username}>{window.location.origin+'/'+username}</Link>)}
              </Box>
          </Box>
        </MainApp>
      </Box>
    )
  )
  
}
{/* 
return (
                <AgendaBlock key={time} time={time} name={name} phone={phone} />
                )}
                 */}