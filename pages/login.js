import { useEffect } from "react";

import router from "next/router";
import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
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
});

export default function Login() {
  const [auth, { login }] = useAuth();

  useEffect(() => {
    console.log("useEffect login : ");
    console.log(auth);
    auth.user && router.push("/agenda");
  }, [auth.user]);

  const authSubmit = (values) => {
    console.log(login);
    login(values);
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
    onSubmit: (values) => authSubmit(values),
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Container width="100" height="100vh" centerContent>
      <Container
        minWidth="320px"
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
              onClick={(event) => (window.location.href = "/")}
            ></Box>
          </Box>
          <Text>Crie sua agenda compartilhada</Text>
        </Container>

        <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
          <FormControl id="email" isRequired>
            <Box display="flex">
              <FormLabel>Email</FormLabel>
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

          <Container centerContent mt="3">
            <Box display="flex">
              <Text>Ainda não tem uma conta ?&nbsp;</Text>
              <Link display="flex" href="/register">
                <Text className="toUnderline">Cadastre-se.</Text>
              </Link>
            </Box>
          </Container>
        </Box>

        <Box p={4}>
          <Button
            width="100%"
            minWidth="125px"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Box>
      </Container>

      <Box minHeight="auto" p={4} textAlign="center" minWidth="320px">
        <Text>Made by N3O - admin(at)n3o.pt </Text>
      </Box>
    </Container>
  );
}
