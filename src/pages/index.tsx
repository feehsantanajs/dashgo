import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


interface Ilogin {
  email: string,
  password: string,
}

const signFormSchema = yup.object().shape({
  email: yup.string().required('Required email').email('Must be a email'),
  password: yup.string().required('Required password'),
})


export default function Home() {
  const { register, handleSubmit, formState  } = useForm({
    resolver: yupResolver(signFormSchema)
  });

  const {errors} = formState;
  
  const handleSignIn: SubmitHandler<Ilogin> = async (values) => {
    await new Promise(resolve => setTimeout(resolve,2000))
    console.log(values);
  }

  return (

    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        flexDirection="column"
        borderRadius={8}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input 
            name="email" 
            type="email" 
            label="Email" 
            error={errors.email}
            {...register('email')} //, {required: 'obligated email'})} 
            
          />
          <Input 
            name="password" 
            type="password" 
            label="Senha" 
            error={errors.password}
            {...register('password')} //,{required: 'obligated passwaord'})} 
            />
        </Stack>

        <Button name='button' type='submit' mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Sign In</Button>
      </Flex>
    </Flex>
  )
}
