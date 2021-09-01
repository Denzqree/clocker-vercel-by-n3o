import React from "react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { useFetch } from "@refetty/react";

import { IconButton, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { addDays, subDays } from "date-fns";

import { formatDate } from "../modules/components";

import { useAuth } from "../modules/providers";

import { MainApp } from "../modules/wrappers";

import { MainHeader } from "../modules/components";

const getSchedule = async (when) => {
  axios({
    method: "get",
    url: "/api/schedule",
    params: {
      when,
      username: window.location.pathname,
    },
  });
};

export default function Schedule() {
  const router = useRouter();

  useEffect(() => {
    console.log("getting schedule")
    getSchedule(when);
  }, []);

   
  //const [auth, { logout }] = useAuth();
  const [when, setWhen] = useState(() => new Date());/* 
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, { lazy: true })

  const removeDay = () => setWhen(prevState => subDays(when, 1))

  const addDay = () =>  setWhen(prevState => addDays(when, 1)) */

  useEffect(() => {
      fetch(when)
  },[when])
/* 
  useEffect(() => {
    console.log("useEffect agenda : ");
    console.log(auth);
    (!)auth.user && router.push("/");
  }, [auth.user])
  */
  return (
    <Box>
      <MainApp>
        <MainHeader>clocker.n3o.pt</MainHeader>
      </MainApp>
    </Box>
  );
}
