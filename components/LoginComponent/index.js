import Link from 'next/link';

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
} from '@chakra-ui/react';

import { LogoComponent } from '../LogoComponent';

import firebase, { persistenceMode } from '../../config/firebase';


const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
});

export const LoginComponent = (props) => {

  const goToHome = () => {
     props.setHomeChoice({login:false,signup:false});
  }

  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: async (values, form) => {
      firebase.auth().setPersistence(persistenceMode);

      try{
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        console.log(user);
      }catch(err){
        console.log(err);
      }finally {
        goToHome();
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    }
  });
  return (
    <Container p={4} centerContent>

      <a href="/"><LogoComponent /></a>

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

      <Box p={4}>
        <Button width="100%" onClick={handleSubmit} colorScheme="blue" isLoading={isSubmitting}>Entrar</Button>
      </Box>

      <Link href="/signup">Ainda não tem uma conta ? Cadastre-se.</Link>
    </Container>
  )
};
