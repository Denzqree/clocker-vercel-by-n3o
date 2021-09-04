import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import appRoutes from "../config/routes"

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
  InputGroup,
  Divider,
} from "@chakra-ui/react";

import { useAuth, usernameExists } from "../modules/providers";

import { LoginHeader } from "../modules/components";
import { CentererBox, LoginApp } from "../modules/wrappers";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
  username: yup
  .string()
  .lowercase()
  .required("Preenchimento obrigatório")
  .test("username equals route", "Nome de usuário proibido, tente outro.", 
    function(value) {
        if(!appRoutes.find(route => route === value)){
          return true
        }
        return false
    })
});

export default function Register() {
  const router = useRouter();

  const [auth, { signup }] = useAuth();

  useEffect(() => {
    console.log("useEffect signup : " + auth.user.value);
    auth.user && router.push("/agenda");
  }, [auth.user]);

  console.log("rendering..")

  const signSubmit = async ({ email, password, username }) => {
      signup({ email, password, username })
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: async (values) => signSubmit(values),
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: ""
    },
  });

  return (
    <CentererBox>
      <LoginApp>
        <LoginHeader />

        <Box marginTop={2} padding={4} width="100%" borderWidth="1px" borderRadius="lg">
          <FormControl id="email" isRequired>
            <Box display="flex">
              <FormLabel>Email</FormLabel>{" "}
              {touched.email && (
                <FormHelperText marginTop={0.5} textColor="#e74c3c">
                  {errors.email}
                </FormHelperText>
              )}
            </Box>
            <Input
              size="lg"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>

          <Divider marginTop={4} />

          <FormControl id="password" marginTop={2} minHeight={10} isRequired>
            <Box display="flex">
              <FormLabel>Senha</FormLabel>
              {touched.password && (
                <FormHelperText marginTop={0.5} textColor="#e74c3c">
                  {errors.password}
                </FormHelperText>
              )}
            </Box>
            <Input
              size="lg"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>

          <Divider marginTop={4} />

          <FormControl marginTop={2} id="username" minHeight={10} isRequired>
            <Box minHeight="5" display="block">
              {touched.username && (
                <FormHelperText m="0" textColor="#e74c3c">
                  {errors.username}
                </FormHelperText>
              )}
            </Box>
            <InputGroup marginTop={2}>
              <InputLeftAddon>clocker.n3o.pt/</InputLeftAddon>
              <Input
                type="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
          </FormControl>

          <Box marginTop="3" fontSize="14px" display="flex" justifyContent="center">
            <Box display="flex">
              <Text>Já tem uma conta ?&nbsp;</Text>
              <Link display="flex" href="/login">
                <Text className="toUnderline">Entre.</Text>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box p={4}>
          <Button
            width="100%"
            minWidth="125px"
            onClick={handleSubmit}
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            Cadastrar
          </Button>
        </Box>
      </LoginApp>
    </CentererBox>
  );
}
