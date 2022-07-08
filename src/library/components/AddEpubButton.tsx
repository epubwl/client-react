import { useNavigate } from "react-router-dom";
import { Flex, FormLabel, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useFileUploadHandler } from "./../hooks";
import { useAPI } from "./../../api";
import { useAuthToken } from "./../../user/hooks";

export function AddEpubButton() {
    const api = useAPI()
    const [authToken] = useAuthToken();
    const navigate = useNavigate();

    const epubUploadHandler = useFileUploadHandler(async (file: File) => {
        const metadata = await api.addEpub(authToken, file);
        navigate(`/library/${metadata.epubId}`);
    });

    return (
        <FormLabel _hover={{cursor: "pointer"}} visibility={authToken ? "visible" : "hidden"}>
            <Flex direction="column" alignItems="center" justifyContent="center">
                <AddIcon />
                <Input type="file" display="none" onChange={epubUploadHandler} />
            </Flex>
        </FormLabel>
    )
};