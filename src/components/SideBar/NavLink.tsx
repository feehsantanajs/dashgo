import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ElementType } from "react";


import { IsActiveLink } from "../IsActiveLink";

interface NavLinkProps{
    title:string
    icon:ElementType;
    href:string;
}

export function NavLink({title,icon, href, ...rest}:NavLinkProps){
    return(
        <IsActiveLink href={href} passHref>
            <ChakraLink display="flex" alignItems="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium"> {title}</Text>
            </ChakraLink>
        </IsActiveLink>
    );
 
}