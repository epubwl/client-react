import { useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { BinaryDataManager } from "./BinaryDataManager";
import { MetadataManager } from "./MetadataManager";
import { ErrorMessage } from "./../../global/components/ErrorMessage";
import { PageWithNavBar } from "./../../global/components/PageWithNavBar";

export function Viewer(){
    const { id } = useParams();
    const epubId = Number.parseInt(id || "");
    if (!Number.isNaN(epubId)) {
        return (
            <PageWithNavBar>
                <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
                    <BinaryDataManager epubId={epubId} />
                    <Box flexGrow="1">
                        <MetadataManager epubId={epubId} />
                    </Box>
                </Flex>
            </PageWithNavBar>
        )
    } else {
        return <ErrorMessage message="Invalid ID" />
    }
};