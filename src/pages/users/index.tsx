import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { useUsers } from "../../services/hooks/useUsers";


export default function UserList(){
    const {data, isLoading, isFetching, isError} = useUsers();

    const isWideVersion = useBreakpointValue({
        base:false,
        lg:true,
    });

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
                        <Link href="./users/create" passHref>
                            <Button
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Create new
                            </Button>
                        </Link>
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
                            {data.map(user =>{
                            return(
                                <Tr key={user.id}>
                                    <Td px={["4","4","6"]}>
                                        <Checkbox colorScheme="pink" />
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Text fontWeight="bold">{user.name}</Text>
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

                    <Pagination />
                    </>  
                    )}
                </Box>
            </Flex>
        </Box>
    );
}