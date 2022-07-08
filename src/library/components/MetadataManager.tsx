import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Icon, Spinner } from "@chakra-ui/react";
import { FaSave, FaTrash } from "react-icons/fa";
import { MetadataFields } from "./MetadataFields";
import { useAPI } from "./../../api";
import { EpubMetadata } from "./../../api/interfaces";
import { ErrorMessage } from "./../../global/components/ErrorMessage";
import { HttpRequestError } from "./../../global/errors";
import { useHttpRequestErrorToast } from "./../../global/hooks";
import { useAuthToken } from "./../../user/hooks";

interface Props {
    epubId: number;
}

export function MetadataManager(props: Props) {
    const api = useAPI();
    const [authToken] = useAuthToken();
    const [metadata, setMetadata] = useState<EpubMetadata>({
        epubId: -1,
        owner: "",
        tags: [],
        contributors: null,
        coverage: null,
        creators: null,
        date: null,
        description: null,
        format: null,
        identifier: null,
        languages: null,
        publisher: null,
        relation: null,
        rights: null,
        source: null,
        subject: null,
        title: null,
        type: null
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const httpRequestErrorToast = useHttpRequestErrorToast();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchMetadata(epubId: number) {
            try {
                setLoading(true);
                const metadata = await api.getMetadata(authToken, epubId);
                setMetadata(metadata);
                setLoading(false);
            } catch (error) {
                if (error instanceof HttpRequestError) {
                    setErrorMessage(`HTTP Error ${error.code}`);
                } else {
                    throw error;
                }
            }
            
        }
        fetchMetadata(props.epubId);
    }, [props.epubId, authToken, api]);
    async function handleSave() {
        try {
            await api.replaceMetadata(authToken, metadata);
        } catch (error) {
            if (error instanceof HttpRequestError) {
                httpRequestErrorToast(error.code);
            } else {
                throw error;
            }
        }
    }
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
    } else if (loading) {
        return <Flex alignItems="center" justifyContent="center" flexGrow="1"><Spinner size="xl" /></Flex>
    }
    return (
        <Flex direction="column" alignItems="center" justifyContent="center">
            <Flex direction="column" height="calc(100vh - 124px)" width="100%" alignItems="center" justifyContent="center">
                <MetadataFields metadata={metadata} setMetadata={setMetadata} />
            </Flex>
            <Flex direction="row" alignItems="center" justifyContent="space-between">
                <Button onClick={handleSave} size="lg"><Icon as={FaSave} /></Button>
                <Button onClick={handleDelete} size="lg"><Icon as={FaTrash} /></Button>
            </Flex>
        </Flex>
    );
};