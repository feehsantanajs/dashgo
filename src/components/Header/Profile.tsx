import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps{
    showProfileData?:boolean;
}
export function Profile({showProfileData = true}:ProfileProps){
    return(
        <Flex 
            align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Felipe Santana</Text>
                    <Text color="gray.300" fontSize="small">
                        felipe.jesus0801@gmail.com
                    </Text>
                </Box>

            )} 
            <Avatar size="md" name="Felipe Santana" src="https://github.com/feelipesantana.png"/>
            
        </Flex>
    );
}