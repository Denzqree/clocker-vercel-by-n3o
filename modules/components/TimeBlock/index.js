import { useState } from "react";

import { useFormik } from "formik";

import * as yup from "yup";

import axios from 'axios';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { Input } from "../Input";

const setSchedule = async (data) =>{
  console.log(window.location.pathname)
  axios({
    method: "post",
    url: "/api/schedule",
    params: {
      ...data,
      username: window.location.pathname.replace("/",""),
    },
  })
}

const ModalTimeBlock = ({ isOpen, onClose, onComplete, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faça a sua reserva</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={onComplete}>
            Reservar horário
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const { values, handleSubmit, handleBlur, handleChange, errors, touched } = useFormik({
    onSubmit: (values) => setSchedule({...values, when: time}),
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Preenchimento obrigatório"),
      phone: yup.number().required("Preenchimento obrigatório"),
    }),
  });

  return (
    <Button
      textColor="white"
      backgroundColor="#4E84D4"
      colorScheme="blue"
      p={8}
      onClick={toggle}
    >
      {time}

      <ModalTimeBlock isOpen={isOpen} onClose={toggle} time={time} onComplete={handleSubmit}>
        <>
          <Input
            label="Nome:"
            touched={touched.name}
            name="name"
            error={errors.name}
            placeholder="Digite seu nome"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            size="lg"
          />
          <Input
            label="Número de telefone:"
            touched={touched.phone}
            name="phone"
            error={errors.phone}
            placeholder="(99) 999 999 999"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            size="lg"
          />
        </>
      </ModalTimeBlock>
    </Button>
  );
};
