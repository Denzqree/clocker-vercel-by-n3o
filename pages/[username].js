import React from "react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { useFetch } from "@refetty/react";

import { IconButton, Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { addDays, subDays, format } from "date-fns";

import { useAuth } from "../modules/providers";

import { MainApp } from "../modules/wrappers";

import { formatDate, MainHeader, TimeBlock } from "../modules/components";

const getSchedule = async (when, username) => {
  if(!username){
      return
  }
  return await axios({
      method: "get",
      url: "/api/schedule",
      params: {
        date: format(when, "yyyy-MM-dd"),
        username,
      }
    })
}

export default function Schedule() {
  const router = useRouter();
  //leave useauth for displaying go to my agenda in header
  const [auth, { logout }] = useAuth();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
  })

  const removeDay = () => setWhen((prevState) => subDays(when, 1));
  const addDay = () => setWhen((prevState) => addDays(when, 1));

  const refresh = () => fetch(when, router.query.username)

  useEffect(() => {
    refresh()
  }, [when, router.query.username]);


  return (
    <Box>
      <MainApp>
        <MainHeader>clocker.n3o.pt</MainHeader>

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
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
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
            <SimpleGrid p={4} columns={2} spacing={4}>
              {loading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
              {data?.error && (
                data.error
              )}
              {data?.result?.map(({ time, isBlocked }) => (
                <TimeBlock key={time} date={when} time={time} disabled={isBlocked} onSuccess={refresh} />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </MainApp>
    </Box>
  );
}
