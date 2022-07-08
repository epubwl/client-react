import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, FormLabel, Icon, Image, Input, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
import { FaBookOpen, FaDownload, FaTrash, FaUpload } from "react-icons/fa";
import { useFileUploadHandler, useObjectUrl, useSaveBlob } from "./../hooks";
import { useAPI } from "./../../api";
import { ErrorMessage } from "./../../global/components/ErrorMessage";
import { HttpRequestError } from "./../../global/errors";
import { useHttpRequestErrorToast } from "./../../global/hooks";
import { useAuthToken } from "./../../user/hooks";

interface Props {
    epubId: number;
}

export function BinaryDataManager(props: Props) {
    const api = useAPI();
    const [authToken] = useAuthToken();
    const [coverUrl, setCover] = useObjectUrl();
    const saveBlob = useSaveBlob();
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const httpRequestErrorToast = useHttpRequestErrorToast();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCover(epubId: number) {
            try {
                setLoading(true);
                const blob = await api.getCover(authToken, epubId);
                setCover(blob);
                setLoading(false);
            } catch (error) {
                if (error instanceof HttpRequestError) {
                    setErrorMessage(`HTTP Error ${error.code}`);
                } else {
                    throw error;
                }
            }
            
        }
        fetchCover(props.epubId);
    }, [props.epubId, authToken, setCover, api]);
    async function handleEpubDownload() {
        const data = await api.getEpub(authToken, props.epubId);
        saveBlob(data, `${props.epubId}.epub`);
    }
    const epubUploadHandler = useFileUploadHandler(async (file: File) => {
        await api.replaceEpub(authToken, props.epubId, file);
    });
    const coverUploadHandler = useFileUploadHandler(async (file: File) => {
        await api.replaceCover(authToken, props.epubId, file);
        setCover(file);
    });
    async function handleDelete() {
        try {
            await api.deleteEpub(authToken, props.epubId);
            navigate("/library");
        } catch (error) {
            if (error instanceof HttpRequestError) {
                httpRequestErrorToast(error.code);
            } else {
                throw error;
            }
        }
    }
    if (errorMessage) {
        return <ErrorMessage message={errorMessage} />
    }
    else if (loading) {
        return <Flex alignItems="center" justifyContent="center" flexGrow="1"><Spinner size="xl" /></Flex>
    }
    return (
        <Flex direction="column" alignItems="center" justifyContent="center">
            <Flex direction="column" height="calc(100vh - 124px)" maxHeight="calc(100vw * (4/3))" width="calc((100vh - 124px) * 0.75)" maxWidth="100vw" alignItems="center" justifyContent="center">
                <Image src={coverUrl} maxHeight="100%" />
            </Flex>
            <Flex direction="row" alignItems="center" justifyContent="space-between">
                <Button size="lg"><Icon as={FaBookOpen} /></Button>
                <Button onClick={handleEpubDownload} size="lg"><Icon as={FaDownload} /></Button>
                <Menu>
                    <MenuButton as={Button} size="lg">
                        <Icon as={FaUpload} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <FormLabel _hover={{cursor: "pointer"}} width="100%">
                                Replace Cover
                                <Input type="file" display="none" onChange={coverUploadHandler} />
                            </FormLabel>
                        </MenuItem>
                        <MenuItem>
                            <FormLabel _hover={{cursor: "pointer"}} width="100%">
                                Replace Epub
                                <Input type="file" display="none" onChange={epubUploadHandler} />
                            </FormLabel>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Button onClick={handleDelete} size="lg"><Icon as={FaTrash} /></Button>
            </Flex>
        </Flex>
    )
};