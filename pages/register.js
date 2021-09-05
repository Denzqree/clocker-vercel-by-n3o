import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import appRoutes from "../config/routes";

import {
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { useAuth } from "../modules/providers";

import { LoginHeader } from "../modules/components";
import { CentererBox, LoginApp } from "../modules/wrappers";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Preenchimento obrigatório"),
  password: yup
    .string()
    .matches(/.*[^ ].*/, "Palavra-passe não pode conter só espaços")
    .matches(/^\S+$/, "Palavra-passe não pode conter espaços")
    .required("Preenchimento obrigatório"),
  username: yup
    .string()
    .lowercase()
    .required("Preenchimento obrigatório")
    .matches(/.*[^ ].*/, "Nome de usuário não pode conter só espaços")
    .matches(/^\S+$/, "Nome de usuário não pode conter espaços")
    .test(
      "username equals route",
      "Nome de usuário proibido, tente outro.",
      function (value) {
        if (!appRoutes.find((route) => route === value)) {
          return true;
        }
        return false;
      }
    ),
});

const ModalErrorPopup = ({ isOpen, onClose, children }) => {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="auto" padding={4}>
        <ModalCloseButton />
        <Box display="flex" alignItems="center" textAlign="center" marginY={4}>
        <ModalBody>{children}
        </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default function Register() {
  const router = useRouter();

  const [auth, { usernameExists, signup }] = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const [signError, setSignError] = useState();

  const displayError = (error) => {
    setSignError(error);
    toggle();
  }

  useEffect(() => {
    auth.user && router.push("/agenda");
  }, [auth.user]);

  console.log("rendering..");


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
      await usernameExists(values.username).then(async (result) => {
        console.log(result)
        if (result) {
          displayError("Este nome de usuário já existe.");
        }else{
          await signup(values).then(result => {
            if(result.error && result.error.code === "auth/email-already-in-use"){
              displayError("Este email já se encontra registado.")
            }
              console.log(result)
          })
        }
      });


    },
    validationSchema,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <CentererBox>
      <ModalErrorPopup isOpen={isOpen} onClose={toggle}>
        {signError}
      </ModalErrorPopup>
      <LoginApp>
        <LoginHeader />

        <Box
          marginTop={2}
          padding={4}
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
        >
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

          <Box
            marginTop="3"
            fontSize="14px"
            display="flex"
            justifyContent="center"
          >
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
