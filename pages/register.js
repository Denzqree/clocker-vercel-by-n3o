import { useEffect } from "react";

import router from "next/router";
import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import axios from "axios";

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

import { LogoComponent } from "../components";
import { useAuth } from "../providers";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
  username: yup.string().required("Preenchimento obrigatório"), //Pode/deve se verificar se o usuario ja esta cadastrado
});

export default function Register() {
  const [auth, { signup }] = useAuth();

  useEffect(() => {
    console.log("useEffect signup : " + auth.user.value);
    auth.user && router.push("/agenda");
  }, [auth.user]);

  /*Deprecated
  const goToLogin = () => {
    props.setHomeChoice({ login: true, signup: false });
  };

  const goToHome = () => {
    props.setHomeChoice({ login: false, signup: false });
  };
  */

  const signSubmit = ({ email, password, username}) => {
    signup({ email, password, username});
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
    onSubmit: async (values) => {
      signSubmit(values);
    },
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  return (
    <Container width="100" height="100vh" centerContent>
      <Container
        minWidth="20vh"
        marginY="auto"
        paddingX={4}
        paddingY={4}
        centerContent
      >
        <Container
          p={5}
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
          centerContent
        >
          <Box h="100" cursor="pointer">
            <Box zIndex="0">
              <LogoComponent />
            </Box>
            <Box
              height="100"
              position="relative"
              top="-100"
              left="0"
              onClick={(event) => (window.location.href = "/login")}
            ></Box>
          </Box>
          <Text>Crie sua agenda compartilhada</Text>
        </Container>

        <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
          <FormControl id="email" isRequired>
            <Box display="flex">
              <FormLabel>Email</FormLabel>{" "}
              {touched.email && (
                <FormHelperText mt={0.5} textColor="#e74c3c">
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

          <Divider mt={4} />

          <FormControl id="password" mt={2} minHeight={10} isRequired>
            <Box display="flex">
              <FormLabel>Senha</FormLabel>
              {touched.password && (
                <FormHelperText mt={0.5} textColor="#e74c3c">
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

          <Divider mt={4} />

          <FormControl mt={2} id="username" minHeight={10} isRequired>
            <Box minHeight="5" display="block">
              {touched.username && (
                <FormHelperText m="0" textColor="#e74c3c">
                  {errors.username}
                </FormHelperText>
              )}
            </Box>
            <InputGroup>
              <InputLeftAddon>clocker.n3o.pt/</InputLeftAddon>
              <Input
                type="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
          </FormControl>

          <Container centerContent mt="3">
            <Box display="flex">
              <Text>Já tem uma conta ?&nbsp;</Text>
              <Link display="flex" href="/login">
                <Text className="toUnderline">Entre.</Text>
              </Link>
            </Box>
          </Container>
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
      </Container>
      <Box minHeight="auto" p={4} textAlign="center" minWidth="320px">
        <Text>Made by N3O - admin(at)n3o.pt </Text>
      </Box>
    </Container>
  );
}
