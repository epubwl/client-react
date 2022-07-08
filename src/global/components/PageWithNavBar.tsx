import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavBar } from "./NavBar";

interface Props {
    children: React.ReactNode
}

export function PageWithNavBar(props: Props) {
    return (
        <Flex flexDirection="column">
            <NavBar />
            <Box flexGrow="1">
                {props.children}
            </Box>
        </Flex>
    )
};