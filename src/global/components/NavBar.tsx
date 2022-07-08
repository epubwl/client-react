import { Flex } from "@chakra-ui/react";
import { ThemeChanger } from "./ThemeChanger";
import { AddEpubButton } from "./../../library/components/AddEpubButton";
import { Account } from "./../../user/components/Account";

export function NavBar() {
    return (
        <Flex position="sticky" top="0" backgroundColor="chakra-body-bg" zIndex="sticky" padding="12px" alignItems="center" justifyContent="space-between">
            <ThemeChanger />
            <Flex>
                <AddEpubButton />
                <Account />
            </Flex>
        </Flex>
    )
};