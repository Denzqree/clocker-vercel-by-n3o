import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import {
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
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
  password: yup.string().required("Preenchimento obrigatório"),
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

export default function Login() {
  const router = useRouter();
  const [auth, { login }] = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const [loginError, setLoginError] = useState();

  const displayError = (error) => {
    setLoginError(error);
    toggle();
  }

  useEffect(() => {
    console.log("useEffect login : ");
    console.log(auth);
    auth.user && router.push("/agenda");
  }, [auth.user]);

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
      await login(values).then(result => {
        if(result.error){
        switch(result.error.code){
          case "auth/user-not-found" : displayError("Esse utilizador não foi encontrado.")
          case "auth/wrong-password" : displayError("A palavra-passe está errada.")
          case "auth/too-many-requests" : displayError("Você já tentou demasiadas vezes, espere um pouco e volte a tentar.")
        }
      }
      })
    },
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CentererBox>
      <ModalErrorPopup isOpen={isOpen} onClose={toggle}>
        {loginError}
      </ModalErrorPopup>
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

          <Box mt="3" fontSize="14px" display="flex" justifyContent="center">
              <Text>Ainda não tem uma conta ?&nbsp;</Text>
              <Link display="flex" href="/register">
                <Text className="toUnderline">Cadastre-se.</Text>
              </Link>
          </Box>
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
