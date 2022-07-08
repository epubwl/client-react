import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Flex, Image, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useObjectUrl } from "./../hooks";
import { useAPI } from "./../../api";
import { EpubMetadata } from "./../../api/interfaces";
import { HttpRequestError } from "./../../global/errors";
import { useAuthToken } from "./../../user/hooks";

interface Props {
    epubId: number;
}

export function EpubCard(props: Props) {
    const api = useAPI();
    const [authToken] = useAuthToken();
    const [coverUrl, setCover] = useObjectUrl();
    const [loadingCover, setLoadingCover] = useState<boolean>(true);
    const [coverErrorCode, setCoverErrorCode] = useState<number>(0);
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
    const [loadingMetadata, setLoadingMetadata] = useState<boolean>(true);
    const [metadataErrorCode, setMetadataErrorCode] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCover(epubId: number) {
            try {
                setLoadingCover(true);
                const blob = await api.getCover(authToken, epubId);
                setCover(blob);
                setLoadingCover(false);
            } catch (error) {
                if (error instanceof HttpRequestError) {
                    setCoverErrorCode(error.code);
                } else {
                    throw error;
                }
            }
            
        }
        fetchCover(props.epubId);
    }, [props.epubId, authToken, setCover, api]);
    useEffect(() => {
        async function fetchMetadata(epubId: number) {
            try {
                setLoadingMetadata(true);
                const metadata = await api.getMetadata(authToken, epubId);
                setMetadata(metadata);
                setLoadingMetadata(false);
            } catch (error) {
                if (error instanceof HttpRequestError) {
                    setMetadataErrorCode(error.code);
                } else {
                    throw error;
                }
            }
            
        }
        fetchMetadata(props.epubId);
    }, [props.epubId, authToken, api]);
    let cover;
    if (coverErrorCode) {
        cover = <Text color="red">{coverErrorCode}</Text>;
    } else if (loadingCover) {
        cover = <Spinner size="xl" />;
    } else {
        cover = <Image src={coverUrl} height="100%" />;
    }
    let text;
    if (metadataErrorCode) {
        text = <Text color="red">{props.epubId} HttpError {metadataErrorCode}</Text>
    } else {
        text = <Text>{props.epubId} - {metadata.title}</Text>
    }
    return (
        <Flex direction="column" alignItems="center" justifyContent="center"
            _hover={{cursor: "pointer"}} onClick={() => navigate(`/library/${props.epubId}`)}
        >
            <Center width="150px" height="200px">
                {cover}
            </Center>
            <Skeleton isLoaded={!loadingMetadata}>
                {text}
            </Skeleton>
        </Flex>
    );
};