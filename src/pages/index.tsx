import {Button, Flex, Stack} from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
export default function Home() {

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
      >
        <Stack spacing={4}>          
          <Input name="email" type="email" label="Email"/>          
          <Input name="passwrod" type="password" label="Senha"/>
        </Stack>
        
        <Button name='button' type='button' mt="6" colorScheme="pink" size="lg">Entrar</Button>
      </Flex>
    </Flex>
  )
}
