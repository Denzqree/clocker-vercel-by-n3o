import { useFormik } from 'formik';

import * as yup from 'yup';

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
} from '@chakra-ui/react';

import { Logo } from './../components/Logo';

import firebase from './../config/firebase';

const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'), //Pode/deve se verificar se o usuario ja esta cadastrado
});

export default function Home() {
  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: (values, form) => {
      console.log(values);
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    }
  })
  return (
    <Container p={4} centerContent>

      <Logo />

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box p={4} width="100%" >
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
        </FormControl>
        
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
        </FormControl>
      </Box>

      <FormControl id="username" p={4} isRequired>
        <InputGroup>
          <InputLeftAddon children="n3o.pt/clocker/"/>
          <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
        </InputGroup>
        {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText> }
      </FormControl>

      <Box p={4}>
        <Button width="100%" onClick={handleSubmit} colorScheme="blue" isLoading={isSubmitting}>Entrar</Button>
      </Box>
    </Container>
  )
};
