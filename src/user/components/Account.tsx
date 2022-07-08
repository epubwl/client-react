import { Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useAuthToken, useLogout } from "./../hooks";

export function Account() {
    const logout = useLogout();
    const [authToken] = useAuthToken();

    return (
        <Menu>
            <MenuButton visibility={authToken ? "visible" : "hidden"}>
                <Icon as={FaUser} />
            </MenuButton>
            <MenuList>
                <MenuItem>Change Password</MenuItem>
                <MenuItem>Delete Account</MenuItem>
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}