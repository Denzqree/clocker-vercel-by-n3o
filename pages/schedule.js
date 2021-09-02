import React from "react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { useFetch } from "@refetty/react";

import { IconButton, Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { addDays, format, subDays } from "date-fns";

import { useAuth } from "../modules/providers";

import { MainApp } from "../modules/wrappers";

import { formatDate, MainHeader, TimeBlock } from "../modules/components";

const getSchedule = async ({when}) =>
  axios({
    method: "get",
    url: "/api/schedule",
    params: {
      ...data,
      date: format(when, "yyyy-MM-dd"),
      username: window.location.pathname,
    },
  });

export default function Schedule() {
  const router = useRouter();
  const [auth, { logout }] = useAuth();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  const removeDay = () => setWhen((prevState) => subDays(when, 1));
  const addDay = () => setWhen((prevState) => addDays(when, 1));



  /*   useEffect(() => {
    console.log("useEffect schedule : ");
    console.log(auth);
    if(!auth.user){
      console.log("user is empty")
    }
    !auth.user && router.push("/");
  }, [auth.user]) */

  useEffect(() => {
    fetch(when);
  }, [when]);

  return (
    <Box>
      <MainApp>
        <MainHeader logout={logout}>clocker.n3o.pt</MainHeader>

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
              {data?.map((time) => (
                <TimeBlock key={time} time={time} />
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </MainApp>
    </Box>
  );
}
