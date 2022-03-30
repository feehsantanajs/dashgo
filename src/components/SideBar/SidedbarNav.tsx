import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
    return(
        <Stack spacing="12" align="flex-start">
            <NavSection title="GENERAL">
                <NavLink title="Deashboard" icon={RiDashboardLine} />
                <NavLink title="User" icon={RiContactsLine} />
            </NavSection>
            <NavSection title="AUTOMATION">  
                <NavLink title="Forms" icon={RiInputMethodLine} />
                <NavLink title="Automation" icon={RiGitMergeLine} />                    
            </NavSection>
        </Stack>
    );
}