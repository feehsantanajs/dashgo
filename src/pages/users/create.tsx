import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, useBreakpointValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";


import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


interface FieldDatas {
    name: string,
    email: string,
    password:string,
    password_confirmation:string
    
  }
  

  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Required name'),
    email: yup.string().required('Required email').email('Must be a email'),
    password: yup.string().required('Required password').min(6, 'Must have at least 6 character'),
    password_confirmation: yup.string().oneOf([
        null,
        yup.ref('password')
    ], 'The passawords must be equals.'),
  })

export default function CreateUser(){
    
    const { register, handleSubmit, formState  } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const {errors} = formState;

    const handleSignIn: SubmitHandler<FieldDatas> = async (values) => {
        await new Promise(resolve => setTimeout(resolve,2000))
        console.log(values);
    }


    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["4","6"]} >
                <Sidebar />

                <Box 
                    as="form" 
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.800" 
                    p={["6","8"]} 
                    onSubmit={handleSubmit(handleSignIn)}
                >
                
                   <Heading size={"lg"} fontWeight="normal"> Create user</Heading>

                   <Divider my="6" borderColor="gray.700" />

                   <VStack spacing="8">
                       <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="name" 
                                label="Name" 
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input 
                                name="email" 
                                type="email" 
                              
                                error={errors.email}
                                {...register('email')}
                            />
                       </SimpleGrid>
                       <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="password" 
                                type="password" 
                                label="Password" 
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Password Confirmation" 
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                       </SimpleGrid>
                       
                   </VStack>

                   <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">
                       
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salve</Button>
                            <Link href="/users" passHref>
                                <Button as="a"  colorScheme="whiteAlpha">Cancel</Button>
                            </Link>
                        </HStack>
                   </Flex>
                </Box>
            </Flex>
        </Box>
    );
}