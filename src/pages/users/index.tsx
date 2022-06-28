import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList({users}){
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching, isError} = useUsers(page, {
        inicialData: users,
    });

    const isWideVersion = useBreakpointValue({
        base:false,
        lg:true,
    });
    async function handlePrefetchUser(userId:string){
        await queryClient.prefetchQuery(['user',userId], async () =>{
            const response = await api.get(`users/${userId}`)
            return response.data;
        },{
            staleTime: 1000 * 60 * 10,// 10 minutes
        })
    }
    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="6">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Users
                        {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <NextLink href="./users/create" passHref>
                            <Button
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Create new
                            </Button>
                        </NextLink>
                    </Flex>
                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : isError ? (
                        <Flex justify="center">
                            <Text>Fail</Text>
                        </Flex>
                    ) : (
                    <>
                        <Table colorScheme="whiteAlpha" >
                            <Thead>
                                <Tr>
                                    <Th px={["4","4","6"]} color="gray.300" width="8">
                                        <Checkbox colorScheme="pink" />
                                    </Th>
                                    <Th>Users</Th>
                                    {isWideVersion && <Th>Data de cadastro</Th> }    
                                    {isWideVersion &&   <Th width="6"></Th>    }                                 
                                </Tr>
                            </Thead>
                            <Tbody>
                                
                                {data.users.map(user =>{
                                return(
                                    <Tr key={user.id}>
                                        <Td px={["4","4","6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>   
                                                <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                </Link>
                                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                            </Box>
                                        </Td>
                                      
                                        {isWideVersion &&<Td>{user.createdAt}</Td>}
                                        {isWideVersion && 
                                            <Td>
                                                <Button
                                                    as="a" 
                                                    size="sm" 
                                                    fontSize="sm" 
                                                    colorScheme="whiteAlpha"
                                                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                        }
                                        
                                    </Tr>
                                )   
                                })}
                            </Tbody>
                        </Table>
                        <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage}/>
                    </>  
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async () =>{
    const {users, totalCount} = await getUsers(1);
 return{
    props:{

    }
 }
}