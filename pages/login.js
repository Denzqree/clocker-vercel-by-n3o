import { useEffect } from "react";

import { useRouter } from "next/router";
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

import { useAuth } from "../modules/providers";

import { LoginHeader } from "../modules/components";
import { CentererBox, LoginApp } from "../modules/wrappers";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
});

export default function Login() {
  const router = useRouter();
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
    <CentererBox>
      <LoginApp>
        <LoginHeader />

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
      </LoginApp>
    </CentererBox>
  );
}
